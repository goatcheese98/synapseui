import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to FloatingDock story for drag testing
    await page.getByText('Patterns').click();
    await page.getByText('FloatingDock').click();
    await page.waitForLoadState('networkidle');
  });

  test('should allow dragging the floating dock', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    await expect(dock).toBeVisible();

    // Get initial position
    const initialBox = await dock.boundingBox();
    expect(initialBox).toBeTruthy();

    const header = dock.locator('.dock-header');
    await expect(header).toBeVisible();

    // Perform drag operation
    if (initialBox) {
      const startX = initialBox.x + initialBox.width / 2;
      const startY = initialBox.y + initialBox.height / 4; // Drag from header area
      const endX = startX + 100;
      const endY = startY + 50;

      // Drag the dock
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY, { steps: 10 });
      await page.mouse.up();

      // Wait for animation to complete
      await page.waitForTimeout(500);

      // Check that dock has moved
      const finalBox = await dock.boundingBox();
      expect(finalBox).toBeTruthy();
      
      if (finalBox) {
        // Position should have changed
        expect(Math.abs(finalBox.x - initialBox.x)).toBeGreaterThan(50);
      }
    }
  });

  test('should show visual feedback during drag', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    const header = dock.locator('.dock-header');
    
    await expect(dock).toBeVisible();
    await expect(header).toBeVisible();

    // Start drag operation
    await header.hover();
    await page.mouse.down();
    
    // During drag, dock should have dragging state
    await page.waitForTimeout(100);
    
    // Check for drag cursor or visual changes
    const cursor = await header.evaluate(el => getComputedStyle(el).cursor);
    expect(cursor).toContain('grab');
    
    await page.mouse.up();
  });

  test('should handle drag boundaries and constraints', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    const header = dock.locator('.dock-header');
    
    await expect(dock).toBeVisible();

    // Try to drag dock outside viewport
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      const initialBox = await dock.boundingBox();
      if (initialBox) {
        // Try to drag far beyond viewport boundaries
        const startX = initialBox.x + initialBox.width / 2;
        const startY = initialBox.y + initialBox.height / 4;
        
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        
        // Drag way beyond viewport
        await page.mouse.move(viewportSize.width + 200, viewportSize.height + 200, { steps: 10 });
        await page.mouse.up();
        
        await page.waitForTimeout(500);
        
        // Dock should still be within reasonable bounds
        const finalBox = await dock.boundingBox();
        if (finalBox) {
          expect(finalBox.x).toBeLessThan(viewportSize.width);
          expect(finalBox.y).toBeLessThan(viewportSize.height);
          expect(finalBox.x).toBeGreaterThan(-finalBox.width / 2);
          expect(finalBox.y).toBeGreaterThan(-finalBox.height / 2);
        }
      }
    }
  });

  test('should handle multi-touch drag on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const dock = page.locator('.floating-dock').first();
      await expect(dock).toBeVisible();

      const initialBox = await dock.boundingBox();
      if (initialBox) {
        // Perform touch drag
        const startX = initialBox.x + initialBox.width / 2;
        const startY = initialBox.y + initialBox.height / 4;
        const endX = startX + 50;
        const endY = startY + 30;

        await page.touchscreen.tap(startX, startY);
        await page.touchscreen.tap(endX, endY);
        
        await page.waitForTimeout(300);
        
        // Dock should respond to touch interactions
        await expect(dock).toBeVisible();
      }
    }
  });

  test('should handle rapid drag movements', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    const header = dock.locator('.dock-header');
    
    await expect(dock).toBeVisible();

    const initialBox = await dock.boundingBox();
    if (initialBox) {
      const centerX = initialBox.x + initialBox.width / 2;
      const centerY = initialBox.y + initialBox.height / 4;

      // Perform rapid drag movements
      await page.mouse.move(centerX, centerY);
      await page.mouse.down();
      
      // Quick successive movements
      await page.mouse.move(centerX + 50, centerY + 20, { steps: 1 });
      await page.mouse.move(centerX - 30, centerY + 40, { steps: 1 });
      await page.mouse.move(centerX + 80, centerY - 10, { steps: 1 });
      
      await page.mouse.up();
      await page.waitForTimeout(500);

      // Dock should still be visible and responsive
      await expect(dock).toBeVisible();
      
      // Should be able to interact with dock after rapid movements
      const controlBtn = dock.locator('.dock-control-btn');
      await controlBtn.click();
    }
  });

  test('should preserve dock state during drag', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    
    await expect(dock).toBeVisible();

    // Check initial panel state
    const activeTab = dock.locator('.dock-tab--active');
    const initialTabText = await activeTab.textContent();

    // Perform drag
    const header = dock.locator('.dock-header');
    const initialBox = await dock.boundingBox();
    
    if (initialBox) {
      const startX = initialBox.x + initialBox.width / 2;
      const startY = initialBox.y + initialBox.height / 4;
      
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 100, startY + 50, { steps: 5 });
      await page.mouse.up();
      
      await page.waitForTimeout(300);
    }

    // Panel state should be preserved
    const finalActiveTab = dock.locator('.dock-tab--active');
    const finalTabText = await finalActiveTab.textContent();
    
    expect(finalTabText).toBe(initialTabText);
    
    // Content should still be visible
    const content = dock.locator('.dock-content');
    await expect(content).toBeVisible();
  });

  test('should animate smoothly during drag release', async ({ page }) => {
    const dock = page.locator('.floating-dock').first();
    const header = dock.locator('.dock-header');
    
    await expect(dock).toBeVisible();

    const initialBox = await dock.boundingBox();
    if (initialBox) {
      const startX = initialBox.x + initialBox.width / 2;
      const startY = initialBox.y + initialBox.height / 4;
      
      // Start drag
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      
      // Move and release quickly to test inertia/animation
      await page.mouse.move(startX + 150, startY + 100, { steps: 5 });
      await page.mouse.up();
      
      // Wait for potential animation/physics settling
      await page.waitForTimeout(1000);
      
      // Dock should still be visible and stable
      await expect(dock).toBeVisible();
      
      // Should be able to interact after animation
      const tabs = dock.locator('.dock-tab');
      if (await tabs.count() > 0) {
        await tabs.first().click();
        await expect(tabs.first()).toBeVisible();
      }
    }
  });
});