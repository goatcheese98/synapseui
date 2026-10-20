import { test, expect } from '@playwright/test'
import { navigateStory, storyIds } from './helpers/histoire'

test.describe('Histoire Navigation', () => {
  test('should load Histoire and show components', async ({ page }) => {
    await navigateStory(page, 'Components', storyIds.buttons, 'Main Variants')
    const main = page.locator('.histoire-story-variant-grid')
    await main.getByRole('button', { name: 'Primary', exact: true }).waitFor({ state: 'visible' })
    await expect(main.getByRole('button', { name: 'Secondary', exact: true })).toBeVisible()
  })
  test('should identify available stories', async ({ page }) => {
    await navigateStory(page, 'Patterns', storyIds.dock, 'Dark')
    const main = page.locator('main.dock-demo[data-synapse-theme="dark"]')
    await main.waitFor({ state: 'visible' })
    await expect(main.getByRole('heading', { name: 'Floating dock', exact: true })).toBeVisible()
    await expect(main.getByRole('button', { name: 'Run action', exact: true })).toBeVisible()
  })
})
