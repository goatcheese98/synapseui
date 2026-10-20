import { test, expect } from '@playwright/test'
import { navigateStory, openFoundations, storyIds } from './helpers/histoire'
import { visual } from './helpers/visual'

test.describe('Synapse UI E2E Tests', () => {
  test('should load Histoire successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Synapse UI')
    await expect(page.getByAltText('Synapse UI logo')).toBeVisible()
    await openFoundations(page)
  })
  test('should navigate to registered foundations and interact with buttons', async ({ page }) => {
    await navigateStory(page, 'Foundations', storyIds.foundations, 'Light')
    const main = page.locator('main.lum-foundations[data-synapse-theme="light"]')
    const action = main.getByRole('region', { name: 'Variants', exact: true }).getByRole('button', { name: 'Save changes', exact: true })
    await action.waitFor({ state: 'visible' })
    await action.click()
    await expect(main.getByText('Activations: 1', { exact: true })).toBeVisible()
  })
  test('should navigate to FloatingDock pattern', async ({ page }) => {
    await navigateStory(page, 'Patterns', storyIds.dock, 'Light')
    const main = page.locator('main.dock-demo[data-synapse-theme="light"]')
    await main.getByRole('button', { name: 'Drag dock', exact: true }).waitFor({ state: 'visible' })
    await expect(main.getByRole('tabpanel')).toContainText('A movable home')
  })
  test('should test basic interactivity', async ({ page }) => {
    const main = await openFoundations(page)
    const input = main.getByLabel('Component name', { exact: true })
    await input.fill('Button')
    await expect(main.getByText('Entered: Button', { exact: true })).toBeVisible()
    const start = main.getByRole('button', { name: 'Start loading', exact: true })
    await start.click()
    await expect(start).toBeDisabled()
    await expect(start).toHaveAttribute('aria-busy', 'true')
    await main.getByRole('button', { name: 'Reset loading', exact: true }).click()
    await expect(start).toBeEnabled()
  })
  test('should display different button variants', async ({ page }) => {
    await navigateStory(page, 'Components', storyIds.buttons, 'Main Variants')
    const grid = page.locator('.histoire-story-variant-grid')
    await grid.locator('.histoire-generic-render-story > [data-v-app]').first().waitFor({ state: 'attached' })
    for (const name of ['Primary', 'Secondary', 'Neutral Outline', 'Ghost', 'Link']) await expect(grid.getByRole('button', { name, exact: true })).toBeVisible()
  })
  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await navigateStory(page, 'Foundations', storyIds.foundations, 'Light')
    const main = page.locator('main.lum-foundations[data-synapse-theme="light"]')
    await main.waitFor({ state: 'visible' })
    await expect(page.getByText('Select a story', { exact: true })).not.toBeVisible()
    await main.getByRole('region', { name: 'Variants', exact: true }).getByRole('button', { name: 'Save changes', exact: true }).click()
    await expect(main.getByText('Activations: 1', { exact: true })).toBeVisible()
    expect(await main.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)
  })
  test('should take visual snapshots for regression testing', async ({ page }, info) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Synapse UI')
    await expect(page.getByAltText('Synapse UI logo')).toBeVisible()
    await visual(page, 'histoire-homepage.png', info, false)
    const main = await openFoundations(page)
    await expect(main.getByRole('region', { name: 'Variants', exact: true })).toBeVisible()
    await visual(main.getByRole('region', { name: 'Variants', exact: true }), 'foundations-components.png', info)
  })
})
