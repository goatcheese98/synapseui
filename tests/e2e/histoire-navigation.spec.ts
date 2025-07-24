import { test, expect } from '@playwright/test';

test.describe('Histoire Navigation', () => {
  test('should load Histoire and show components', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot to see what Histoire looks like
    await page.screenshot({ path: 'test-results/histoire-homepage.png', fullPage: true });
    
    // Check for Histoire interface elements
    const histoireInterface = page.locator('body');
    await expect(histoireInterface).toBeVisible();
    
    // Look for navigation or component list
    const componentLinks = page.locator('a, button').filter({ hasText: /Button|Components|Simple/i });
    console.log('Found component links:', await componentLinks.count());
    
    if (await componentLinks.count() > 0) {
      const firstLink = componentLinks.first();
      const linkText = await firstLink.textContent();
      console.log('First component link:', linkText);
      
      await firstLink.click();
      await page.waitForTimeout(1000);
      
      // Take screenshot after navigation
      await page.screenshot({ path: 'test-results/after-navigation.png', fullPage: true });
    }
  });

  test('should identify available stories', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Log all text content to understand structure
    const allText = await page.textContent('body');
    console.log('Page content includes:', allText?.substring(0, 500));
    
    // Look for any interactive elements
    const buttons = page.locator('button');
    const links = page.locator('a');
    
    console.log('Buttons found:', await buttons.count());
    console.log('Links found:', await links.count());
    
    // Try to find story navigation
    const storyElements = page.locator('[class*="story"], [class*="variant"], [data-story], nav a, .sidebar a');
    console.log('Story elements found:', await storyElements.count());
    
    if (await storyElements.count() > 0) {
      for (let i = 0; i < Math.min(5, await storyElements.count()); i++) {
        const element = storyElements.nth(i);
        const text = await element.textContent();
        const classes = await element.getAttribute('class');
        console.log(`Element ${i}:`, text, classes);
      }
    }
  });
});