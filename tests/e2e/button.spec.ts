import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Histoire and wait for it to load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to the Button story using Histoire's structure
    const componentsFolder = page.locator('.histoire-story-list-folder').filter({ hasText: 'Components' });
    await componentsFolder.click();
    await page.waitForTimeout(500);
    
    const buttonStory = page.locator('.histoire-story-list-item').filter({ hasText: 'Button' });
    await buttonStory.click();
    await page.waitForLoadState('networkidle');
  });

  test('should display all button variants', async ({ page }) => {
    // Wait for the story content to load
    await page.waitForTimeout(1000);
    
    // Look for the story content area
    const storyContent = page.locator('.histoire-story, [class*="story"], main, .story-render-area').first();
    await expect(storyContent).toBeVisible();

    // Check for different button variants
    const defaultButton = page.getByRole('button', { name: 'Default' }).first();
    const secondaryButton = page.getByRole('button', { name: 'Secondary' }).first();
    const destructiveButton = page.getByRole('button', { name: 'Destructive' }).first();
    const outlineButton = page.getByRole('button', { name: 'Outline' }).first();
    const ghostButton = page.getByRole('button', { name: 'Ghost' }).first();
    const linkButton = page.getByRole('button', { name: 'Link' }).first();

    await expect(defaultButton).toBeVisible();
    await expect(secondaryButton).toBeVisible();
    await expect(destructiveButton).toBeVisible();
    await expect(outlineButton).toBeVisible();
    await expect(ghostButton).toBeVisible();
    await expect(linkButton).toBeVisible();
  });

  test('should display different button sizes', async ({ page }) => {
    // Check for different button sizes
    const smallButton = page.getByRole('button', { name: 'Small' }).first();
    const defaultSizeButton = page.getByRole('button', { name: 'Default' }).nth(1); // Second default button in sizes section
    const largeButton = page.getByRole('button', { name: 'Large' }).first();

    await expect(smallButton).toBeVisible();
    await expect(defaultSizeButton).toBeVisible();
    await expect(largeButton).toBeVisible();

    // Check that buttons have different sizes by comparing bounding boxes
    const smallBox = await smallButton.boundingBox();
    const largeBox = await largeButton.boundingBox();
    
    if (smallBox && largeBox) {
      expect(largeBox.height).toBeGreaterThan(smallBox.height);
    }
  });

  test('should handle button interactions', async ({ page }) => {
    // Look for interactive button in the Interactive variant or story
    const interactiveButton = page.getByRole('button').filter({ hasText: /clicked|interactive/i }).first();
    
    // If interactive button not found, look for any clickable button
    const testButton = await interactiveButton.count() > 0 
      ? interactiveButton 
      : page.getByRole('button').first();

    await expect(testButton).toBeVisible();
    await expect(testButton).toBeEnabled();

    // Test hover effect
    await testButton.hover();
    
    // Test click
    await testButton.click();
    
    // Button should still be visible after click
    await expect(testButton).toBeVisible();
  });

  test('should apply correct CSS classes for variants', async ({ page }) => {
    const defaultButton = page.getByRole('button', { name: 'Default' }).first();
    const destructiveButton = page.getByRole('button', { name: 'Destructive' }).first();
    const outlineButton = page.getByRole('button', { name: 'Outline' }).first();

    // Check that buttons have the expected classes
    await expect(defaultButton).toHaveClass(/bg-primary/);
    await expect(destructiveButton).toHaveClass(/bg-destructive/);
    await expect(outlineButton).toHaveClass(/border/);
  });

  test('should be accessible', async ({ page }) => {
    // Check that buttons are keyboard accessible
    const firstButton = page.getByRole('button').first();
    
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    
    // Test keyboard interaction
    await firstButton.press('Enter');
    await expect(firstButton).toBeVisible();
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const secondButton = page.getByRole('button').nth(1);
    await expect(secondButton).toBeFocused();
  });

  test('should render correctly on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, buttons should still be visible and clickable
      const firstButton = page.getByRole('button').first();
      await expect(firstButton).toBeVisible();
      
      // Test touch interaction
      await firstButton.tap();
      await expect(firstButton).toBeVisible();
    }
  });
});