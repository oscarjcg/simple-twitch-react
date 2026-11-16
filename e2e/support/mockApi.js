const data = require('../fixtures/data');

const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

const CORS = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
};

const json = (route, body, status = 200) =>
    route.fulfill({ status, headers: CORS, contentType: 'application/json', body: JSON.stringify(body) });

const lastSegment = (url) => decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop());

async function mockApi(page) {
    const posts = [];

    await page.route((url) => !LOCAL_HOSTS.includes(url.hostname), (route) => route.abort());

    await page.routeWebSocket((url) => !LOCAL_HOSTS.includes(url.hostname), (ws) => ws.close());

    await page.route('**/api/channel', (route) => json(route, data.channels));

    await page.route('**/api/channel/byname/*', (route) => {
        const channel = data.channels.find((c) => c.name === lastSegment(route.request().url()));
        return channel ? json(route, channel) : json(route, { message: 'Not found' }, 404);
    });

    await page.route('**/api/category', (route) => json(route, data.categories));

    await page.route('**/api/category/byname/*', (route) => {
        const category = data.categories.find((c) => c.name === lastSegment(route.request().url()));
        return category ? json(route, category) : json(route, { message: 'Not found' }, 404);
    });

    await page.route('**/api/category/byname/*/channels', (route) => {
        const parts = new URL(route.request().url()).pathname.split('/');
        const name = decodeURIComponent(parts[parts.length - 2]);
        const category = data.categories.find((c) => c.name === name);
        return json(route, category ? data.channels.filter((c) => c.categoryId === category.id) : []);
    });

    await page.route('**/api/comment/ByChannelName/*', (route) =>
        json(route, data.comments[lastSegment(route.request().url())] || []));

    await page.route('**/api/comment', (route) => {
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
        posts.push(route.request());
        return json(route, {}, 201);
    });

    await page.route('**/api/search/*', (route) => {
        const text = lastSegment(route.request().url()).toLowerCase();
        const match = (item) => item.name.toLowerCase().includes(text);
        return json(route, {
            channels: data.channels.filter(match),
            categories: data.categories.filter(match),
        });
    });

    return { posts };
}

const failRoute = (page, pattern, status = 500) =>
    page.route(pattern, (route) => json(route, { message: 'Server error' }, status));

module.exports = { mockApi, failRoute };
