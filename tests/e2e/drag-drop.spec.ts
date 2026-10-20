import { test, expect, type Locator, type Page } from '@playwright/test'

async function openDock(page: Page) {
  await page.goto('/story/src-stories-floatingdock-story-vue?variantId=src-stories-floatingdock-story-vue-0')
  const main = page.locator('main.dock-demo[data-synapse-theme="light"]')
  await main.locator('.floating-dock .dock-drag-handle').waitFor({ state: 'visible' })
  return main
}
async function box(locator: Locator) {
  const result = await locator.boundingBox()
  expect(result).not.toBeNull()
  return result!
}
async function start(page: Page, main: Locator) {
  const handle = await box(main.getByRole('button', { name: 'Drag dock', exact: true }))
  const point = { x: handle.x + handle.width / 2, y: handle.y + handle.height / 2 }
  await page.mouse.move(point.x, point.y)
  await page.mouse.down()
  return point
}
async function withinWorkspace(main: Locator) {
  const stage = await box(main.getByRole('region', { name: 'Dock workspace' }))
  await expect.poll(async () => {
    const dock = await box(main.locator('.floating-dock'))
    return dock.x >= stage.x - 1 && dock.y >= stage.y - 1
      && dock.x + dock.width <= stage.x + stage.width + 1 && dock.y + dock.height <= stage.y + stage.height + 1
  }).toBe(true)
}

test.describe('Drag and Drop Functionality', () => {
  test('should allow dragging the floating dock', async ({ page }) => {
    const main = await openDock(page)
    const initial = await box(main.locator('.floating-dock'))
    const stage = await box(main.getByRole('region', { name: 'Dock workspace' }))
    const dx = Math.min(70, stage.x + stage.width - initial.x - initial.width)
    const dy = Math.min(35, stage.y + stage.height - initial.y - initial.height)
    expect(dx).toBeGreaterThan(10)
    const p = await start(page, main)
    await page.mouse.move(p.x + 70, p.y + 35, { steps: 5 })
    await expect.poll(async () => Math.abs((await box(main.locator('.floating-dock'))).x - initial.x - dx)).toBeLessThanOrEqual(1)
    await expect.poll(async () => Math.abs((await box(main.locator('.floating-dock'))).y - initial.y - dy)).toBeLessThanOrEqual(1)
    await page.mouse.up()
    await expect(main.locator('.floating-dock')).toHaveAttribute('data-dragging', 'false')
  })

  test('should show visual feedback during drag', async ({ page }) => {
    const main = await openDock(page)
    const dock = main.locator('.floating-dock')
    const handle = main.getByRole('button', { name: 'Drag dock', exact: true })
    await expect(handle).toHaveCSS('cursor', 'grab')
    const initialShadow = await dock.evaluate(el => getComputedStyle(el).boxShadow)
    await start(page, main)
    await expect(dock).toHaveAttribute('data-dragging', 'true')
    await expect(handle).toHaveAttribute('aria-pressed', 'true')
    await expect(handle).toHaveCSS('cursor', 'grabbing')
    await expect.poll(() => dock.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe(initialShadow)
    await page.mouse.up()
    await expect(handle).toHaveAttribute('aria-pressed', 'false')
    await expect(handle).toHaveCSS('cursor', 'grab')
  })

  test('should handle drag boundaries and constraints', async ({ page }) => {
    const main = await openDock(page)
    const workspace = main.getByRole('region', { name: 'Dock workspace' })
    await workspace.scrollIntoViewIfNeeded()
    const stage = await box(workspace)
    const initial = await box(main.locator('.floating-dock'))
    const point = await start(page, main)
    const offset = { x: point.x - initial.x, y: point.y - initial.y }
    // Exceed the dock's legal translation, while keeping input inside the browser viewport.
    // Sending the pointer below the browser window is not delivered consistently by Firefox.
    await page.mouse.move(stage.x + offset.x - 40, stage.y + offset.y - 40, { steps: 5 })
    await withinWorkspace(main)
    const topLeft = await box(main.locator('.floating-dock'))
    expect(Math.abs(topLeft.x - stage.x)).toBeLessThan(2)
    expect(Math.abs(topLeft.y - stage.y)).toBeLessThan(2)
    await page.mouse.move(stage.x + stage.width - initial.width + offset.x + 40,
      stage.y + stage.height - initial.height + offset.y + 40, { steps: 5 })
    await withinWorkspace(main)
    await page.mouse.up()
    await withinWorkspace(main)
    const dock = await box(main.locator('.floating-dock'))
    expect(Math.abs(dock.x + dock.width - stage.x - stage.width)).toBeLessThan(2)
    expect(Math.abs(dock.y + dock.height - stage.y - stage.height)).toBeLessThan(2)
  })

  test('should keep controls interactive and ignore secondary pointer buttons', async ({ page }) => {
    const main = await openDock(page)
    const transform = await main.locator('.floating-dock').evaluate(el => getComputedStyle(el).transform)
    await main.getByRole('button', { name: 'Drag dock' }).click({ button: 'right' })
    await expect(main.locator('.floating-dock')).toHaveAttribute('data-dragging', 'false')
    // A real right-click opens WebKit's native context menu; dismiss it before clicking a control.
    await page.keyboard.press('Escape')
    await main.getByRole('button', { name: 'Run action' }).click()
    await expect(main.getByText('Actions: 1', { exact: true })).toBeVisible()
    const final = await box(main.locator('.floating-dock'))
    expect(await main.locator('.floating-dock').evaluate(el => getComputedStyle(el).transform)).toBe(transform)
    const handle = main.getByRole('button', { name: 'Drag dock' })
    await handle.focus()
    await handle.press('ArrowRight')
    await expect.poll(async () => Math.round((await box(main.locator('.floating-dock'))).x - final.x)).toBe(10)
    await main.getByRole('tab', { name: 'Overview', exact: true }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(main.getByRole('tab', { name: 'Details', exact: true })).toBeFocused()
    await expect(main.getByRole('tabpanel')).toContainText('Panel selection')
  })

  test('should handle rapid drag movements', async ({ page }) => {
    const main = await openDock(page)
    const initial = await box(main.locator('.floating-dock'))
    const p = await start(page, main)
    const stage = await box(main.getByRole('region', { name: 'Dock workspace' }))
    const dx = Math.min(80, stage.x + stage.width - initial.x - initial.width)
    expect(dx).toBeGreaterThan(10)
    for (const [x, y] of [[50, 20], [30, 40], [80, 10]]) await page.mouse.move(p.x + x, p.y + y)
    await expect.poll(async () => Math.abs((await box(main.locator('.floating-dock'))).x - initial.x - dx)).toBeLessThanOrEqual(1)
    await page.mouse.up()
    await withinWorkspace(main)
    await main.getByRole('button', { name: 'Run action' }).click()
    await expect(main.getByText('Actions: 1', { exact: true })).toBeVisible()
  })

  test('should preserve dock state during drag', async ({ page }) => {
    const main = await openDock(page)
    await main.getByRole('tab', { name: 'Details', exact: true }).click()
    await main.getByRole('button', { name: 'Run action' }).click()
    const p = await start(page, main)
    await page.mouse.move(p.x + 90, p.y + 40, { steps: 5 })
    await page.mouse.up()
    await expect(main.getByRole('tab', { name: 'Details', exact: true })).toHaveAttribute('aria-selected', 'true')
    await expect(main.getByRole('tabpanel')).toContainText('Panel selection and actions survive every drag.')
    await expect(main.getByText('Actions: 1', { exact: true })).toBeVisible()
  })

  test('should settle bounded inertia and cancel a captured drag safely', async ({ page }) => {
    const main = await openDock(page)
    const p = await start(page, main)
    await page.mouse.move(p.x + 65, p.y + 30)
    await page.mouse.up()
    await withinWorkspace(main)
    const dock = main.locator('.floating-dock')
    await expect.poll(() => dock.evaluate(async el => {
      const before = el.getBoundingClientRect()
      for (let frame = 0; frame < 3; frame++) await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
      const after = el.getBoundingClientRect()
      return Math.abs(after.x - before.x) < 0.01 && Math.abs(after.y - before.y) < 0.01
    })).toBe(true)
    await withinWorkspace(main)
    await main.getByRole('button', { name: 'Reset position' }).click()
    await dock.evaluate(el => el.addEventListener('pointerdown', event => el.setAttribute('data-test-pointer-id', String((event as PointerEvent).pointerId)), { once: true }))
    const next = await start(page, main)
    await page.mouse.move(next.x + 30, next.y + 10)
    const pointerId = Number(await dock.getAttribute('data-test-pointer-id'))
    await dock.dispatchEvent('pointercancel', { pointerId })
    await expect(dock).toHaveAttribute('data-dragging', 'false')
    await page.mouse.up()
    await main.getByRole('tab', { name: 'Details', exact: true }).click()
    await expect(main.getByRole('tabpanel')).toContainText('Panel selection')
  })
})
