const { test, expect } = require('./support/test');

test.describe('browse', () => {
    test('filters categories while typing', async ({ page }) => {
        await page.goto('/directory');
        const main = page.locator('main');
        await expect(main.getByText('Minecraft')).toBeVisible();

        await main.getByPlaceholder('Search').fill('ZEL');

        await expect(main.getByText('Minecraft')).toHaveCount(0);
        await expect(main.getByText('Zelda')).toBeVisible();
    });

    test('filters live channels while typing', async ({ page }) => {
        await page.goto('/directory/all');
        const main = page.locator('main');
        await expect(main.getByText('alex')).toBeVisible();

        await main.getByPlaceholder('Search').fill('ste');

        await expect(main.getByText('alex')).toHaveCount(0);
        await expect(main.getByText('steve')).toBeVisible();
    });

    test('opens a category and lists only its channels', async ({ page }) => {
        await page.goto('/directory');
        const main = page.locator('main');

        await main.getByText('Minecraft').click();

        await expect(page).toHaveURL('/directory/game/Minecraft');
        await expect(page.getByRole('heading', { name: 'Minecraft' })).toBeVisible();
        await expect(main.getByText('steve')).toBeVisible();
        await expect(main.getByText('alex')).toBeVisible();
        await expect(main.getByText('link', { exact: true })).toHaveCount(0);
    });

    test('filters a category\'s channels with Enter', async ({ page }) => {
        await page.goto('/directory/game/Minecraft');
        const main = page.locator('main');
        await expect(main.getByText('steve')).toBeVisible();

        const filter = main.getByPlaceholder('Search');
        await filter.fill('ale');
        await expect(main.getByText('steve')).toBeVisible();
        await filter.press('Enter');

        await expect(main.getByText('steve')).toHaveCount(0);
        await expect(main.getByText('alex')).toBeVisible();
    });

    test('opens a channel from the game page', async ({ page }) => {
        await page.goto('/directory/game/Minecraft');

        await page.locator('main').getByText('steve').click();

        await expect(page).toHaveURL('/steve');
    });
});
