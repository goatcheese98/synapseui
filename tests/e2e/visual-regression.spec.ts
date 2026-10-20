import { test, expect } from '@playwright/test'
import { openButtonVariant, openDock, openFoundations } from './helpers/histoire'
import { visual } from './helpers/visual'

test.use({ colorScheme: 'light' })
test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: 'reduce' }) })

test.describe('Visual Regression Tests', () => {
  test.describe('Button Component Visuals', () => {
    test('should match button variants visual snapshot', async ({ page }, info) => {
      const item = await openButtonVariant(page, 'Main Variants')
      for (const name of ['Neutral', 'Primary', 'Secondary', 'Accent', 'Success', 'Warning', 'Error', 'Info']) await expect(item.getByRole('button', { name, exact: true })).toBeVisible()
      await visual(item, 'button-variants.png', info)
    })
    test('should match button sizes visual snapshot', async ({ page }, info) => {
      const item = await openButtonVariant(page, 'All Sizes')
      let previous = 0
      for (const name of ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large']) {
        const button = item.getByRole('button', { name, exact: true })
        await expect(button).toBeVisible()
        const height = (await button.boundingBox())!.height
        expect(height).toBeGreaterThan(previous)
        previous = height
      }
      await visual(item, 'button-sizes.png', info)
    })
    test('should match button hover states', async ({ page }, info) => {
      const main = await openFoundations(page)
      const action = main.getByRole('region', { name: 'Variants', exact: true }).getByRole('button', { name: 'Save changes', exact: true })
      await page.mouse.move(0, 0)
      await expect(action).toHaveCSS('filter', 'none')
      await visual(action, 'button-normal.png', info)
      await action.hover()
      await expect(action).toHaveCSS('filter', 'brightness(0.94)')
      await visual(action, 'button-hover.png', info)
    })
  })
  test.describe('FloatingDock Component Visuals', () => {
    test('should match basic floating dock visual snapshot', async ({ page }, info) => {
      const main = await openDock(page)
      await expect(main.getByRole('tabpanel')).toContainText('A movable home')
      await visual(main.locator('.floating-dock'), 'floating-dock-basic.png', info)
    })
    test('should match dock hover state', async ({ page }, info) => {
      const main = await openDock(page)
      const dock = main.locator('.floating-dock')
      await page.mouse.move(0, 0)
      const normal = await dock.evaluate(el => getComputedStyle(el).boxShadow)
      await visual(dock, 'dock-normal.png', info)
      await dock.hover()
      await expect.poll(() => dock.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe(normal)
      await visual(dock, 'dock-hover.png', info)
    })
    test('should match dock with different panel content', async ({ page }, info) => {
      const main = await openDock(page)
      const dock = main.locator('.floating-dock')
      await expect(dock.getByRole('tab')).toHaveCount(2)
      await expect(dock.getByRole('tabpanel')).toContainText('A movable home')
      await visual(dock, 'dock-panel-1.png', info)
      await dock.getByRole('tab', { name: 'Details', exact: true }).click()
      await expect(dock.getByRole('tabpanel')).toContainText('Panel selection')
      await visual(dock, 'dock-panel-2.png', info)
    })
    test('should match keyboard drag handle focus visual', async ({ page }, info) => {
      const main = await openDock(page)
      const handle = main.getByRole('button', { name: 'Drag dock', exact: true })
      await handle.focus()
      await handle.press('Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(handle).toBeFocused()
      await expect(handle).toHaveCSS('outline-style', 'solid')
      await visual(main.getByRole('region', { name: 'Dock workspace' }), 'dock-handle-focus.png', info)
    })
  })
  test.describe('Responsive Design Visuals', () => {
    test('should match mobile layout', async ({ page }, info) => {
      await page.setViewportSize({ width: 375, height: 667 })
      const main = await openFoundations(page)
      expect(await main.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)
      await expect(main.getByRole('region', { name: 'Variants', exact: true })).toBeVisible()
      await visual(page, 'buttons-mobile.png', info)
    })
    test('should match tablet layout', async ({ page }, info) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      const main = await openDock(page)
      const stage = (await main.getByRole('region', { name: 'Dock workspace' }).boundingBox())!
      const dock = (await main.locator('.floating-dock').boundingBox())!
      expect(dock.width).toBeLessThanOrEqual(stage.width)
      await visual(main, 'dock-tablet.png', info)
    })
  })
  test.describe('Dark Mode Visuals', () => {
    test('should match dark mode appearance', async ({ page }, info) => {
      const main = await openFoundations(page, 'dark')
      const variants = main.getByRole('region', { name: 'Variants', exact: true })
      await expect(variants.getByRole('button', { name: 'Save changes', exact: true })).toHaveCSS('background-color', 'rgb(214, 168, 40)')
      expect(await main.evaluate(el => getComputedStyle(el).getPropertyValue('--bg').trim())).toBe('#0a0a0b')
      await visual(variants, 'buttons-dark-mode.png', info)
    })
  })
  test.describe('Animation States', () => {
    test('should capture loading states', async ({ page }, info) => {
      const main = await openFoundations(page)
      const section = main.getByRole('region', { name: 'Behavior is part of the component.', exact: true })
      const start = main.getByRole('button', { name: 'Start loading', exact: true })
      await expect(start).toBeEnabled()
      await visual(section, 'loading-idle.png', info)
      await start.click()
      await expect(start).toBeDisabled()
      await expect(start).toHaveAttribute('aria-busy', 'true')
      await visual(section, 'loading-active.png', info)
      await main.getByRole('button', { name: 'Reset loading', exact: true }).click()
      await expect(start).toBeEnabled()
    })
    test('should capture focus states', async ({ page }, info) => {
      const main = await openFoundations(page)
      const variants = main.getByRole('region', { name: 'Variants', exact: true })
      const action = variants.getByRole('button', { name: 'Save changes', exact: true })
      await action.focus()
      await action.press('Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(action).toBeFocused()
      await expect(action).toHaveCSS('outline-style', 'solid')
      await visual(variants, 'button-focused.png', info)
    })
  })
})
