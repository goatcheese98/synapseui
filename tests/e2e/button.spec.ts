import { test, expect, type Page } from '@playwright/test'

async function openButtons(page: Page) {
  await page.goto('/story/src-stories-button-story-vue?variantId=src-stories-button-story-vue-1')
  // Navigation completes before Histoire mounts its separate Vue preview apps.
  // Wait for the named fixture's actual mount, not a product assertion's deadline.
  const grid = page.locator('.histoire-story-variant-grid')
  const mainVariants = grid.locator('.histoire-story-variant-grid-item').filter({
    has: page.getByRole('link', { name: 'Main Variants', exact: true }),
  })
  await mainVariants.locator('.histoire-generic-render-story > [data-v-app]').waitFor({ state: 'attached' })
  await expect(mainVariants.getByRole('button', { name: 'Primary', exact: true })).toBeVisible()
  return grid
}
async function openFoundations(page: Page) {
  await page.goto('/story/src-stories-lumfoundations-story-vue?variantId=src-stories-lumfoundations-story-vue-0')
  await page.locator('.histoire-generic-render-story > [data-v-app]').waitFor({ state: 'attached' })
  const content = page.locator('main[data-synapse-theme="light"]')
  await expect(content).toBeVisible()
  return content
}

test.describe('Button Component', () => {
  test('should display all button variants', async ({ page }) => {
    const grid = await openButtons(page)
    for (const name of ['Neutral', 'Primary', 'Secondary', 'Accent', 'Success', 'Warning', 'Error', 'Info', 'Neutral Outline', 'Primary Outline', 'Success Outline', 'Error Outline', 'Ghost', 'Ghost Primary', 'Link']) {
      await expect(grid.getByRole('button', { name, exact: true })).toBeVisible()
    }
  })
  test('should display different button sizes', async ({ page }) => {
    const grid = await openButtons(page)
    const small = await grid.getByRole('button', { name: 'Small', exact: true }).boundingBox()
    const medium = await grid.getByRole('button', { name: 'Medium', exact: true }).boundingBox()
    const large = await grid.getByRole('button', { name: 'Large', exact: true }).boundingBox()
    expect(small).not.toBeNull(); expect(medium).not.toBeNull(); expect(large).not.toBeNull()
    expect(medium!.height).toBeGreaterThan(small!.height)
    expect(large!.height).toBeGreaterThan(medium!.height)
  })
  test('should handle button interactions', async ({ page }) => {
    const content = await openFoundations(page)
    const start = content.getByRole('button', { name: 'Start loading', exact: true })
    await start.click()
    await expect(start).toBeDisabled()
    await expect(start).toHaveAttribute('aria-busy', 'true')
    await content.getByRole('button', { name: 'Reset loading', exact: true }).click()
    await expect(start).toBeEnabled()
  })
  test('should apply correct CSS classes for variants', async ({ page }) => {
    const grid = await openButtons(page)
    for (const [name, className] of [['Primary', 'synapse-primary'], ['Error', 'synapse-error'], ['Neutral Outline', 'synapse-outline']]) {
      await expect(grid.getByRole('button', { name, exact: true })).toHaveClass(new RegExp(className))
    }
  })
  test('should be accessible', async ({ page }) => {
    const content = await openFoundations(page)
    const action = content.getByRole('button', { name: 'Save changes', exact: true }).first()
    await action.focus(); await action.press('Enter'); await action.press('Space')
    await expect(content.getByText('Activations: 2', { exact: true })).toBeVisible()
    await page.keyboard.press('Tab')
    await expect(content.getByRole('button', { name: 'Cancel', exact: true })).toBeFocused()
  })
  test('should render correctly on mobile', async ({ page, isMobile }) => {
    const content = await openFoundations(page)
    const action = content.getByRole('button', { name: 'Save changes', exact: true }).first()
    if (isMobile) await action.tap()
    else await action.click()
    await expect(content.getByText('Activations: 1', { exact: true })).toBeVisible()
    expect(await content.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true)
  })
})
