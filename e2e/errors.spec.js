const { test, expect } = require('./support/test');
const { failRoute } = require('./support/mockApi');

test.describe('API errors', () => {
    test('Browse shows an error when categories fail to load', async ({ page }) => {
        await failRoute(page, '**/api/category');
        await page.goto('/directory');

        await expect(page.locator('main').getByText('Error', { exact: true })).toBeVisible();
    });

    test('Live Channels shows an error when channels fail to load', async ({ page }) => {
        await failRoute(page, '**/api/channel');
        await page.goto('/directory/all');

        await expect(page.locator('main').getByText('Error', { exact: true })).toBeVisible();
    });

    test('an unknown channel shows an error', async ({ page }) => {
        await page.goto('/nobody');

        await expect(page.locator('main').getByText('Error', { exact: true })).toBeVisible();
    });
});
