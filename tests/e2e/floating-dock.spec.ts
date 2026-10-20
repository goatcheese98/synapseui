import { test, expect } from '@playwright/test'

async function openDock(page: import('@playwright/test').Page) {
  await page.goto('/story/src-stories-floatingdock-story-vue?variantId=src-stories-floatingdock-story-vue-0')
  const main = page.locator('main.dock-demo[data-synapse-theme="light"]')
  await main.getByRole('button', { name: 'Drag dock', exact: true }).waitFor({ state: 'visible' })
  return main
}

test.describe('FloatingDock Component', () => {
  test('should render the retained dock with its handle and slotted content', async ({ page }) => {
    const main = await openDock(page)
    const dock = main.locator('.floating-dock')
    await expect(dock).toBeVisible()
    await expect(dock.getByRole('button', { name: 'Drag dock' })).toBeVisible()
    await expect(dock.getByRole('tabpanel')).toContainText('A movable home for compact controls.')
  })
  test('should display selectable panel tabs', async ({ page }) => {
    const main = await openDock(page)
    await expect(main.getByRole('tab')).toHaveCount(2)
    await expect(main.getByRole('tab', { name: 'Overview', exact: true })).toHaveAttribute('aria-selected', 'true')
    await expect(main.getByRole('tab', { name: 'Details', exact: true })).toHaveAttribute('aria-selected', 'false')
  })
  test('should switch between panels when tabs are clicked', async ({ page }) => {
    const main = await openDock(page)
    for (const name of ['Details', 'Overview']) {
      await main.getByRole('tab', { name, exact: true }).click()
      await expect(main.getByRole('tab', { name, exact: true })).toHaveAttribute('aria-selected', 'true')
      await expect(main.getByRole('tabpanel').getByRole('heading')).toHaveText(name)
    }
  })
  test('should reset position while preserving panel and action state', async ({ page }) => {
    const main = await openDock(page)
    const dock = main.locator('.floating-dock')
    const before = (await dock.boundingBox())!
    await main.getByRole('tab', { name: 'Details', exact: true }).click()
    await main.getByRole('button', { name: 'Run action' }).click()
    await main.getByRole('button', { name: 'Drag dock' }).focus()
    await page.keyboard.press('ArrowRight')
    await expect.poll(async () => Math.round((await dock.boundingBox())!.x - before.x)).toBe(10)
    await main.getByRole('button', { name: 'Reset position' }).click()
    await expect.poll(async () => Math.round((await dock.boundingBox())!.x - before.x)).toBe(0)
    await expect(main.getByRole('tab', { name: 'Details', exact: true })).toHaveAttribute('aria-selected', 'true')
    await expect(main.getByText('Actions: 1', { exact: true })).toBeVisible()
  })
  test('should show a real hover effect without changing geometry', async ({ page }) => {
    const main = await openDock(page)
    const dock = main.locator('.floating-dock')
    await page.mouse.move(0, 0)
    const before = await dock.evaluate(el => getComputedStyle(el).boxShadow)
    const initial = (await dock.boundingBox())!
    await dock.hover()
    await expect.poll(() => dock.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe(before)
    const final = (await dock.boundingBox())!
    expect(final.width).toBeCloseTo(initial.width, 0)
    expect(final.height).toBeCloseTo(initial.height, 0)
  })
  test('should display actual slotted content for each panel', async ({ page }) => {
    const main = await openDock(page)
    await expect(main.getByRole('tabpanel')).toContainText('A movable home for compact controls.')
    await main.getByRole('tab', { name: 'Details', exact: true }).click()
    await expect(main.getByRole('tabpanel')).toContainText('Panel selection and actions survive every drag.')
    await main.getByRole('button', { name: 'Run action' }).click()
    await expect(main.getByText('Actions: 1', { exact: true })).toBeVisible()
  })
  test('should fit its workspace and retain controls at every viewport', async ({ page, isMobile }) => {
    const main = await openDock(page)
    const stage = (await main.getByRole('region', { name: 'Dock workspace' }).boundingBox())!
    const dock = (await main.locator('.floating-dock').boundingBox())!
    expect(dock.width).toBeLessThanOrEqual(stage.width)
    expect(dock.height).toBeLessThanOrEqual(stage.height)
    expect(dock.x).toBeGreaterThanOrEqual(stage.x)
    expect(dock.x + dock.width).toBeLessThanOrEqual(stage.x + stage.width)
    const action = main.getByRole('button', { name: 'Run action' })
    if (isMobile) await action.tap()
    else await action.click()
    await expect(main.getByText('Actions: 1', { exact: true })).toBeVisible()
  })
  test('should retain fixed positioning and scoped LUM surfaces', async ({ page }) => {
    const main = await openDock(page)
    const dock = main.locator('.floating-dock')
    await expect(dock).toHaveCSS('position', 'fixed')
    await expect(dock).toHaveCSS('z-index', '50')
    await expect(dock).toHaveCSS('border-radius', '12px')
    const colors = await dock.evaluate(el => ({ surface: getComputedStyle(el).backgroundColor, token: getComputedStyle(el).getPropertyValue('--panel').trim(), border: getComputedStyle(el).borderTopWidth }))
    expect(colors.surface).toBe('rgb(255, 255, 255)')
    expect(colors.token).toBe('#fff')
    expect(colors.border).toBe('1px')
  })
})
