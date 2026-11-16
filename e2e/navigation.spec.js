const { test, expect } = require('./support/test');

test.describe('navigation', () => {
    test('Discover shows recommended categories and channels', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByText('Simple Twitch')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Recommended categories' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Recommended Simulation' })).toBeVisible();

        const main = page.locator('main');
        await expect(main.getByText('Minecraft')).toBeVisible();
        await expect(main.getByText('steve')).toBeVisible();
    });

    test('navbar and tabs move between Discover and Browse', async ({ page }) => {
        await page.goto('/');
        const navbar = page.locator('header');

        await navbar.getByRole('link', { name: 'Browse' }).click();
        await expect(page).toHaveURL('/directory');
        await expect(page.getByRole('heading', { name: 'Browse' })).toBeVisible();
        await expect(page.locator('main').getByText('Zelda')).toBeVisible();

        await page.getByRole('link', { name: 'Live Channels' }).click();
        await expect(page).toHaveURL('/directory/all');
        await expect(page.locator('main').getByText('alex')).toBeVisible();
        await expect(page.locator('main').getByText('Zelda')).toHaveCount(0);

        await navbar.getByRole('link', { name: 'Discover' }).click();
        await expect(page).toHaveURL('/');
        await expect(page.getByRole('heading', { name: 'Recommended categories' })).toBeVisible();
    });

    test('the "Popular channels" sidebar opens a channel', async ({ page }) => {
        await page.goto('/directory');
        const sidebar = page.locator('[class*="ChannelsPanel"]');

        await expect(sidebar.getByText('Popular channels')).toBeVisible();
        await sidebar.getByText('link', { exact: true }).click();

        await expect(page).toHaveURL('/link');
        await expect(page.locator('main').getByText('link', { exact: true })).toBeVisible();
    });
});
