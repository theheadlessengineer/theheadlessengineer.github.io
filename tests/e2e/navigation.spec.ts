import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Karan Popat/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
  });

  test('should navigate to articles page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Articles');
    await expect(page).toHaveURL('/articles');
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Contact');
    await expect(page).toHaveURL('/contact');
  });
});

test.describe('Articles', () => {
  test('should display articles list', async ({ page }) => {
    await page.goto('/articles');
    const articles = page.locator('article');
    await expect(articles.first()).toBeVisible();
  });

  test('should navigate to article detail', async ({ page }) => {
    await page.goto('/articles');
    const firstArticle = page.locator('article').first();
    await firstArticle.click();
    await expect(page).toHaveURL(/\/articles\/.+/);
  });
});

test.describe('Theme', () => {
  test('should toggle theme', async ({ page }) => {
    await page.goto('/');
    const themeButton = page.locator('button[aria-label*="theme"]');
    await themeButton.click();
    // Theme should change (check for data-theme attribute or class)
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme');
  });
});

test.describe('Responsive', () => {
  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
  });
});
