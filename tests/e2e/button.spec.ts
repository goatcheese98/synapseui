import { test, expect, type Page } from '@playwright/test'

async function openButtons(page: Page) {
  await page.goto('/story/src-stories-button-story-vue?variantId=src-stories-button-story-vue-1')
  await expect(page.locator('button.synapse-button:visible').filter({ hasText: /^\s*Primary\s*$/ })).toBeVisible()
}
async function openFoundations(page: Page) {
  await page.goto('/story/src-stories-lumfoundations-story-vue?variantId=src-stories-lumfoundations-story-vue-0')
  const content = page.locator('main[data-synapse-theme="light"]')
  await expect(content).toBeVisible()
  return content
}

test.describe('Button Component', () => {
  test('should display all button variants', async ({ page }) => {
    await openButtons(page)
    for (const name of ['Neutral', 'Primary', 'Secondary', 'Accent', 'Success', 'Warning', 'Error', 'Info', 'Neutral Outline', 'Primary Outline', 'Success Outline', 'Error Outline', 'Ghost', 'Ghost Primary', 'Link']) {
      await expect(page.locator('button.synapse-button:visible').getByText(name, { exact: true })).toBeVisible()
    }
  })
  test('should display different button sizes', async ({ page }) => {
    await openButtons(page)
    const small = await page.locator('button.synapse-button:visible').filter({ hasText: /^\s*Small\s*$/ }).boundingBox()
    const medium = await page.locator('button.synapse-button:visible').filter({ hasText: /^\s*Medium\s*$/ }).boundingBox()
    const large = await page.locator('button.synapse-button:visible').filter({ hasText: /^\s*Large\s*$/ }).boundingBox()
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
    await openButtons(page)
    for (const [name, className] of [['Primary', 'synapse-primary'], ['Error', 'synapse-error'], ['Neutral Outline', 'synapse-outline']]) {
      await expect(page.locator('button.synapse-button:visible').filter({ hasText: new RegExp(`^\\s*${name}\\s*$`) })).toHaveClass(new RegExp(className))
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
