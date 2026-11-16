const base = require('@playwright/test');
const { mockApi } = require('./mockApi');

const test = base.test.extend({
    api: [async ({ page }, use) => {
        await use(await mockApi(page));
    }, { auto: true }],
});

module.exports = { test, expect: base.expect };
