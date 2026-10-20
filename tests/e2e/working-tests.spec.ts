import { test, expect } from '@playwright/test';

test.describe('Synapse UI E2E Tests', () => {
  test('should load Histoire successfully', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle('Synapse UI');
    await expect(page.getByAltText('Synapse UI logo')).toBeVisible();
    if (isMobile) {
      await expect(page.getByText('Select a story...', { exact: true })).toBeVisible();
    } else {
      await expect(page.getByRole('button', { name: 'Components', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Foundations', exact: true })).toBeVisible();
    }
    await page.goto('/story/src-stories-lumfoundations-story-vue?variantId=src-stories-lumfoundations-story-vue-0');
    await expect(page.locator('main[data-synapse-theme="light"]')).toBeVisible();
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

  test('should navigate to FloatingDock pattern', async ({ page, isMobile }) => {
    await page.goto('/')
    if (isMobile) await page.getByText('Select a story...', { exact: true }).click()
    const patterns = page.getByRole('button', { name: 'Patterns', exact: true })
    await patterns.click()
    const story = page.getByRole('link', { name: /^FloatingDock \d+$/ })
    await expect(story).toHaveAttribute('href', '/story/src-stories-floatingdock-story-vue')
    await story.click()
    if (isMobile) await page.getByText('Select a variant...', { exact: true }).click()
    await page.getByRole('link', { name: 'Light', exact: true }).click()
    await page.locator('main.dock-demo').waitFor({ state: 'visible' })
    await expect(page.locator('main.dock-demo')).toBeVisible()
    await expect(page.locator('main.dock-demo').getByRole('button', { name: 'Drag dock', exact: true })).toBeVisible()
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