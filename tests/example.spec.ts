import { test, expect } from '@playwright/test';

test.describe('Example Test Suite', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero-title')).toContainText('Welcome to ShopHub');
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('shop-now-button').click();
    await expect(page.getByTestId('page-title')).toContainText('Products');
  });
});
