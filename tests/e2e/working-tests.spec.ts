import { test, expect } from '@playwright/test';

test.describe('Synapse UI E2E Tests', () => {
  test('should load Histoire successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that Histoire loads
    await expect(page).toHaveTitle(/Histoire/i);
    
    // Should see the story navigation
    const storyList = page.locator('.histoire-story-list');
    await expect(storyList).toBeVisible();
    
    // Should see Components and Patterns sections
    await expect(page.locator('text=Components')).toBeVisible();
    await expect(page.locator('text=Patterns')).toBeVisible();
  });

  test('should navigate to Simple Demo and interact with buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Components > Simple Demo
    const componentsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Components' });
    await componentsFolder.click();
    await page.waitForTimeout(500);
    
    const simpleDemoStory = page.locator('.histoire-story-list-item').filter({ hasText: 'Simple Demo' });
    await simpleDemoStory.click();
    await page.waitForTimeout(1000);
    
    // Should see buttons on the page
    const buttons = page.getByRole('button');
    await expect(buttons.first()).toBeVisible();
    
    // Should be able to click buttons
    const clickableButton = page.getByRole('button').filter({ hasText: /Clicked|Click/i }).first();
    if (await clickableButton.count() > 0) {
      await clickableButton.click();
      await expect(clickableButton).toBeVisible();
    }
  });

  test('should navigate to FloatingDock pattern', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Patterns > FloatingDock
    const patternsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Patterns' });
    await patternsFolder.click();
    await page.waitForTimeout(500);
    
    const floatingDockStory = page.locator('.histoire-story-list-item').filter({ hasText: 'FloatingDock' });
    await floatingDockStory.click();
    await page.waitForTimeout(1000);
    
    // Should see floating dock elements
    const dockElements = page.locator('.floating-dock, [class*="dock"], [class*="panel"]');
    
    // At least one dock-related element should be visible
    await expect(dockElements.first()).toBeVisible();
  });

  test('should test basic interactivity', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Go to Simple Demo for reliable button testing
    const componentsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Components' });
    await componentsFolder.click();
    await page.waitForTimeout(500);
    
    const simpleDemoStory = page.locator('.histoire-story-list-item').filter({ hasText: 'Simple Demo' });
    await simpleDemoStory.click();
    await page.waitForTimeout(1000);
    
    // Find any clickable button and test it
    const allButtons = page.getByRole('button');
    const buttonCount = await allButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Test first button
    const firstButton = allButtons.first();
    await expect(firstButton).toBeVisible();
    await expect(firstButton).toBeEnabled();
    
    // Test hover
    await firstButton.hover();
    await page.waitForTimeout(200);
    
    // Test click
    await firstButton.click();
    
    // Button should still be there after click
    await expect(firstButton).toBeVisible();
  });

  test('should display different button variants', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Button story
    const componentsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Components' });
    await componentsFolder.click();
    await page.waitForTimeout(500);
    
    const buttonStory = page.locator('.histoire-story-list-item').filter({ hasText: 'Button' });
    await buttonStory.click();
    await page.waitForTimeout(1000);
    
    // Should see multiple buttons with different styles
    const buttons = page.getByRole('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(3); // Should have multiple variants
    
    // Check for common button text
    const defaultButton = page.getByRole('button', { name: 'Default' });
    if (await defaultButton.count() > 0) {
      await expect(defaultButton.first()).toBeVisible();
    }
    
    const secondaryButton = page.getByRole('button', { name: 'Secondary' });
    if (await secondaryButton.count() > 0) {
      await expect(secondaryButton.first()).toBeVisible();
    }
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigation should still work on mobile
    const storyList = page.locator('.histoire-story-list');
    await expect(storyList).toBeVisible();
    
    // Should be able to navigate to a component
    const componentsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Components' });
    await componentsFolder.click();
    await page.waitForTimeout(500);
    
    const simpleDemoStory = page.locator('.histoire-story-list-item').filter({ hasText: 'Simple Demo' });
    await simpleDemoStory.click();
    await page.waitForTimeout(1000);
    
    // Buttons should be visible on mobile
    const buttons = page.getByRole('button');
    await expect(buttons.first()).toBeVisible();
  });

  test('should take visual snapshots for regression testing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of Histoire homepage
    await expect(page).toHaveScreenshot('histoire-homepage.png');
    
    // Navigate to Simple Demo
    const componentsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Components' });
    await componentsFolder.click();
    await page.waitForTimeout(500);
    
    const simpleDemoStory = page.locator('.histoire-story-list-item').filter({ hasText: 'Simple Demo' });
    await simpleDemoStory.click();
    await page.waitForTimeout(1000);
    
    // Take screenshot of components
    await expect(page).toHaveScreenshot('simple-demo-components.png');
  });
});