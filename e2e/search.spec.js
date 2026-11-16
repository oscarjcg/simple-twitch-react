const { test, expect } = require('./support/test');

test.describe('navbar search', () => {
    test('finds a channel and opens it', async ({ page }) => {
        await page.goto('/');
        const navbar = page.locator('header');

        await navbar.getByPlaceholder('Search').fill('ste');
        const result = navbar.getByRole('link', { name: 'steve' });
        await expect(result).toBeVisible();
        await result.click();

        await expect(page).toHaveURL('/steve');
        await expect(result).toHaveCount(0);
        await expect(page.locator('main').getByText('first!')).toBeVisible();
    });

    test('finds a category and opens its game page', async ({ page }) => {
        await page.goto('/');
        const navbar = page.locator('header');

        await navbar.getByPlaceholder('Search').fill('zel');
        await navbar.getByRole('link', { name: 'Zelda' }).click();

        await expect(page).toHaveURL('/directory/game/Zelda');
        await expect(page.getByRole('heading', { name: 'Zelda' })).toBeVisible();
    });

    test('closes the results when clicking outside', async ({ page }) => {
        await page.goto('/');
        const navbar = page.locator('header');

        await navbar.getByPlaceholder('Search').fill('zel');
        await expect(navbar.getByRole('link', { name: 'Zelda' })).toBeVisible();

        await page.getByText('Simple Twitch').click();

        await expect(navbar.getByRole('link', { name: 'Zelda' })).toHaveCount(0);
    });
});
