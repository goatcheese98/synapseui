import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Button Component Visuals', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByText('Components').click();
      await page.getByText('Button').click();
      await page.waitForLoadState('networkidle');
    });

    test('should match button variants visual snapshot', async ({ page }) => {
      // Find the variants section
      const variantsSection = page.locator('.story-variant').first();
      await expect(variantsSection).toBeVisible();
      
      // Take screenshot of button variants
      await expect(variantsSection).toHaveScreenshot('button-variants.png');
    });

    test('should match button sizes visual snapshot', async ({ page }) => {
      // Navigate to sizes variant if exists, or take screenshot of sizes section
      const sizesSection = page.locator('.story-variant').nth(1);
      if (await sizesSection.count() > 0) {
        await expect(sizesSection).toHaveScreenshot('button-sizes.png');
      }
    });

    test('should match button hover states', async ({ page }) => {
      const firstButton = page.getByRole('button').first();
      await expect(firstButton).toBeVisible();
      
      // Normal state
      await expect(firstButton).toHaveScreenshot('button-normal.png');
      
      // Hover state
      await firstButton.hover();
      await page.waitForTimeout(300); // Wait for hover animation
      await expect(firstButton).toHaveScreenshot('button-hover.png');
    });
  });

  test.describe('FloatingDock Component Visuals', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/story/src-stories-floatingdock-story-vue?variantId=src-stories-floatingdock-story-vue-0');
      await page.locator('main.dock-demo[data-synapse-theme="light"] .dock-drag-handle').waitFor({ state: 'visible' });
    });

    test('should match basic floating dock visual snapshot', async ({ page }) => {
      const dock = page.locator('main.dock-demo[data-synapse-theme="light"] .floating-dock');
      await expect(dock).toBeVisible();
      await expect(dock).toHaveScreenshot('floating-dock-basic.png');
    });

    test('should match dock hover state', async ({ page }) => {
      const dock = page.locator('main.dock-demo[data-synapse-theme="light"] .floating-dock');
      await expect(dock).toBeVisible();
      await expect(dock).toHaveScreenshot('dock-normal.png');
      await dock.hover();
      await expect(dock).toHaveScreenshot('dock-hover.png');
    });

    test('should match dock with different panel content', async ({ page }) => {
      const dock = page.locator('main.dock-demo[data-synapse-theme="light"] .floating-dock');
      await expect(dock.getByRole('tab')).toHaveCount(2);
      await expect(dock).toHaveScreenshot('dock-panel-1.png');
      await dock.getByRole('tab', { name: 'Details', exact: true }).click();
      await expect(dock.getByRole('tabpanel')).toContainText('Panel selection');
      await expect(dock).toHaveScreenshot('dock-panel-2.png');
    });

    test('should match keyboard drag handle focus visual', async ({ page }) => {
      const dock = page.locator('main.dock-demo[data-synapse-theme="light"] .floating-dock');
      const handle = dock.getByRole('button', { name: 'Drag dock', exact: true });
      await handle.focus();
      await expect(handle).toBeFocused();
      await expect(dock).toHaveScreenshot('dock-handle-focus.png');
    });
  });

  test.describe('Responsive Design Visuals', () => {
    test('should match mobile layout', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Navigate to Button component
      await page.getByText('Components').click();
      await page.getByText('Button').click();
      await page.waitForLoadState('networkidle');
      
      const buttonSection = page.locator('.story-variant').first();
      await expect(buttonSection).toHaveScreenshot('buttons-mobile.png');
    });

    test('should match tablet layout', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Navigate to FloatingDock
      await page.getByText('Patterns').click();
      await page.getByText('FloatingDock').click();
      await page.waitForLoadState('networkidle');
      
      const dock = page.locator('.floating-dock').first();
      if (await dock.count() > 0) {
        await expect(dock).toHaveScreenshot('dock-tablet.png');
      }
    });
  });

  test.describe('Dark Mode Visuals', () => {
    test('should match dark mode appearance', async ({ page }) => {
      // Try to enable dark mode if available
      const darkModeToggle = page.locator('[data-theme="dark"], .dark-mode-toggle');
      
      if (await darkModeToggle.count() > 0) {
        await darkModeToggle.click();
        await page.waitForTimeout(500);
        
        // Navigate to components
        await page.getByText('Components').click();
        await page.getByText('Button').click();
        await page.waitForLoadState('networkidle');
        
        const buttonSection = page.locator('.story-variant').first();
        await expect(buttonSection).toHaveScreenshot('buttons-dark-mode.png');
      } else {
        // Manually set dark mode via CSS if toggle not available
        await page.addStyleTag({
          content: `
            :root { 
              color-scheme: dark;
            }
            body, .story-variant {
              background: #1a1a1a !important;
              color: #ffffff !important;
            }
          `
        });
        
        await page.getByText('Components').click();
        await page.getByText('Button').click();
        await page.waitForLoadState('networkidle');
        
        const buttonSection = page.locator('.story-variant').first();
        await expect(buttonSection).toHaveScreenshot('buttons-simulated-dark.png');
      }
    });
  });

  test.describe('Animation States', () => {
    test('should capture loading states', async ({ page }) => {
      // Navigate to interactive variant if available
      await page.getByText('Components').click();
      await page.getByText('Simple Demo').click();
      await page.waitForLoadState('networkidle');
      
      const interactiveSection = page.locator('.space-y-4').first();
      if (await interactiveSection.count() > 0) {
        await expect(interactiveSection).toHaveScreenshot('interactive-demo.png');
      }
    });

    test('should capture focus states', async ({ page }) => {
      await page.getByText('Components').click();
      await page.getByText('Button').click();
      await page.waitForLoadState('networkidle');
      
      const firstButton = page.getByRole('button').first();
      await firstButton.focus();
      await page.waitForTimeout(200);
      
      await expect(firstButton).toHaveScreenshot('button-focused.png');
    });
  });
});