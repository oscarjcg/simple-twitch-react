const { test, expect } = require('./support/test');

test.describe('channel page', () => {
    test('shows the channel and its chat', async ({ page }) => {
        await page.goto('/steve');
        const main = page.locator('main');

        await expect(main.getByText('steve', { exact: true })).toBeVisible();
        await expect(main.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/steve');
        await expect(main.getByText('CHAT')).toBeVisible();
        await expect(main.getByText('first!')).toBeVisible();
        await expect(main.getByText('nice build')).toBeVisible();
        await expect(main.getByText('People: 0')).toBeVisible();
    });

    test('sends a chat message with Enter', async ({ page, api }) => {
        await page.goto('/steve');
        const input = page.getByPlaceholder('Send a message');

        await input.fill('hello world');
        const request = page.waitForRequest((req) => req.method() === 'POST' && req.url().endsWith('/api/comment'));
        await input.press('Enter');

        const body = (await request).postDataBuffer().toString();
        expect(body).toMatch(/name="channel_id"\r\n\r\n1\r\n/);
        expect(body).toMatch(/name="author"\r\n\r\nReactApp\r\n/);
        expect(body).toMatch(/name="comment"\r\n\r\nhello world\r\n/);
        await expect(input).toHaveValue('');
        expect(api.posts).toHaveLength(1);
    });

    test('3D model channels show the model viewer', async ({ page }) => {
        await page.goto('/alex');

        await expect(page.locator('main iframe')).toHaveAttribute('src', /\?model=chair$/);
    });

    test('switching channel from the sidebar loads the new channel', async ({ page }) => {
        await page.goto('/steve');
        await expect(page.locator('main').getByText('first!')).toBeVisible();

        await page.locator('[class*="ChannelsPanel"]').getByText('alex', { exact: true }).click();

        await expect(page).toHaveURL('/alex');
        await expect(page.locator('main iframe')).toHaveAttribute('src', /\?model=chair$/);
        await expect(page.locator('main').getByText('first!')).toHaveCount(0);
    });
});
