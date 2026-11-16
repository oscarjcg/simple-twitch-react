import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { createAppStore } from './store';
import categoryApi from './axios/axios-category';
import channelApi from './axios/axios-channel';

const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

export function renderWithProviders(ui, { route = '/', path, store = createAppStore() } = {}) {
    const user = userEvent.setup();
    const content = path
        ? <Routes><Route path={path} element={ui} /><Route path="*" element={null} /></Routes>
        : ui;

    const utils = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[route]} future={ROUTER_FUTURE}>
                {content}
                <LocationDisplay />
            </MemoryRouter>
        </Provider>
    );
    return { store, user, ...utils };
}

export function renderWithRouter(ui, { route = '/' } = {}) {
    const user = userEvent.setup();
    const utils = render(
        <MemoryRouter initialEntries={[route]} future={ROUTER_FUTURE}>
            {ui}
            <LocationDisplay />
        </MemoryRouter>
    );
    return { user, ...utils };
}

export const currentPath = (screen) => screen.getByTestId('location').textContent;

export const pressEnter = (element) => fireEvent.keyDown(element, { key: 'Enter', code: 'Enter', keyCode: 13 });

export const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

const clone = (data) => JSON.parse(JSON.stringify(data));
const normalize = (url) => '/' + url.replace(/^\/+/, '');

export const httpError = (status = 500) =>
    Object.assign(new Error(`Request failed with status code ${status}`), { response: { status } });

export function mockGet(routes) {
    const impl = (url) => {
        const path = normalize(url);
        if (!Object.prototype.hasOwnProperty.call(routes, path)) {
            return Promise.reject(new Error(`Unmocked GET ${path}`));
        }
        let res = routes[path];
        if (typeof res === 'function') res = res(path);
        if (res instanceof Error) return Promise.reject(res);
        return Promise.resolve({ data: clone(res) });
    };
    categoryApi.get.mockImplementation(impl);
    channelApi.get.mockImplementation(impl);
}

export function mockPost(result = {}) {
    const impl = () => result instanceof Error ? Promise.reject(result) : Promise.resolve({ data: result });
    categoryApi.post.mockImplementation(impl);
    channelApi.post.mockImplementation(impl);
}

export { categoryApi, channelApi };

export const aCategory = (overrides = {}) => ({
    id: 1, name: 'Minecraft', image: 'minecraft.png', ...overrides,
});

export const aChannel = (overrides = {}) => ({
    id: 1, name: 'steve', image: 'steve.png', preview: 'steve-preview.png',
    content: 'LembwKDo1Dk', channelTypeId: 1, ...overrides,
});

export const aComment = (overrides = {}) => ({
    created_at: '2024-01-01T10:00:00Z', author: 'alex', text: 'hello', ...overrides,
});
