const { test, expect } = require('@playwright/test');

test('basic example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
