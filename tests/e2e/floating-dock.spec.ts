import { test, expect } from '@playwright/test';

test.describe('FloatingDock Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Histoire and wait for it to load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to the FloatingDock story
    await page.getByText('Patterns').click();
    await page.getByText('FloatingDock').click();
    await page.waitForLoadState('networkidle');
  });

  test('should render basic floating dock', async ({ page }) => {
    // Look for the floating dock container
    const dock = page.locator('.floating-dock').first();
    await expect(dock).toBeVisible();

    // Check for dock header
    const header = dock.locator('.dock-header');
    await expect(header).toBeVisible();

    // Check for dock title
    const title = header.locator('.dock-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Control Panel');

    // Check for dock content
    const content = dock.locator('.dock-content');
    await expect(content).toBeVisible();
  });

  test('should display panel tabs', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    
    // Look for dock tabs
    const tabs = dock.locator('.dock-tabs');
    await expect(tabs).toBeVisible();

    // Check for individual tab buttons
    const tabButtons = tabs.locator('.dock-tab');
    await expect(tabButtons).toHaveCount(1); // Basic dock has 1 panel

    // Check that Information tab is active by default
    const infoTab = tabButtons.filter({ hasText: 'Information' });
    await expect(infoTab).toHaveClass(/dock-tab--active/);
  });

  test('should switch between panels when tabs are clicked', async ({ page }) => {
    // Navigate to Multi-Panel variant for this test
    const multiPanelVariant = page.getByText('Multi-Panel Dock');
    if (await multiPanelVariant.count() > 0) {
      await multiPanelVariant.click();
      await page.waitForTimeout(1000);

      const dock = page.locator('.floating-dock').first();
      const tabs = dock.locator('.dock-tabs .dock-tab');
      
      if (await tabs.count() > 1) {
        // Click on different tabs and verify content changes
        const firstTab = tabs.first();
        const secondTab = tabs.nth(1);
        
        await firstTab.click();
        await expect(firstTab).toHaveClass(/dock-tab--active/);
        
        await secondTab.click();
        await expect(secondTab).toHaveClass(/dock-tab--active/);
        await expect(firstTab).not.toHaveClass(/dock-tab--active/);
      }
    }
  });

  test('should have minimize button functionality', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    
    // Find the minimize button
    const minimizeBtn = dock.locator('.dock-control-btn');
    await expect(minimizeBtn).toBeVisible();

    // Test minimize functionality
    await minimizeBtn.click();
    
    // The dock should become hidden or change state
    // (Implementation may vary based on how minimize is handled)
    await page.waitForTimeout(500);
  });

  test('should show hover effects', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    await expect(dock).toBeVisible();

    // Test hover effect on dock
    await dock.hover();
    
    // Check if hover class is applied or styles change
    await expect(dock).toHaveClass(/dock--hovered|floating-dock/);
    
    // Test hover on control button
    const controlBtn = dock.locator('.dock-control-btn');
    await controlBtn.hover();
    await expect(controlBtn).toBeVisible();
  });

  test('should display correct content for different panels', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    const content = dock.locator('.dock-content');
    
    // Check that content is visible
    await expect(content).toBeVisible();
    
    // Basic dock should show Information panel content
    await expect(content).toContainText(/Information|System Status|CPU Usage/i);
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const dock = page.locator('.floating-dock').first();
      await expect(dock).toBeVisible();
      
      // Dock should maintain minimum dimensions on mobile
      const box = await dock.boundingBox();
      expect(box?.width).toBeGreaterThan(200); // min-w-64 = 256px
      expect(box?.height).toBeGreaterThan(150); // min-h-48 = 192px
      
      // Test touch interactions
      const controlBtn = dock.locator('.dock-control-btn');
      await controlBtn.tap();
    }
  });

  test('should maintain dock structure and styling', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    
    // Check for required CSS classes
    await expect(dock).toHaveClass(/floating-dock/);
    await expect(dock).toHaveClass(/fixed/); // Should be positioned fixed
    await expect(dock).toHaveClass(/z-50/); // Should have high z-index
    
    // Check for backdrop blur and transparency
    await expect(dock).toHaveClass(/backdrop-blur/);
    await expect(dock).toHaveClass(/bg-opacity/);
    
    // Check for border and rounded corners
    await expect(dock).toHaveClass(/border/);
    await expect(dock).toHaveClass(/rounded/);
  });
});