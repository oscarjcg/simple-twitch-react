import React from 'react';
import { fireEvent, render, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

import { createAppStore, AppStore } from './store';
import realCategoryApi from './axios/axios-category';
import realChannelApi from './axios/axios-channel';
import type { MockIo } from './__mocks__/socket.io-client';
import type { Category, Channel, Comment } from './types';

// The axios instances and socket.io are replaced by the mocks in __mocks__ (see setupTests.ts).
interface MockApi {
    get: jest.Mock;
    post: jest.Mock;
}
const categoryApi = realCategoryApi as unknown as MockApi;
const channelApi = realChannelApi as unknown as MockApi;
export const mockIo = io as unknown as MockIo;

const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

interface RenderWithProvidersOptions {
    route?: string;
    path?: string;
    store?: AppStore;
}

export function renderWithProviders(ui: React.ReactElement, { route = '/', path, store = createAppStore() }: RenderWithProvidersOptions = {}) {
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

export function renderWithRouter(ui: React.ReactElement, { route = '/' }: { route?: string } = {}) {
    const user = userEvent.setup();
    const utils = render(
        <MemoryRouter initialEntries={[route]} future={ROUTER_FUTURE}>
            {ui}
            <LocationDisplay />
        </MemoryRouter>
    );
    return { user, ...utils };
}

export const currentPath = (screen: typeof rtlScreen) => screen.getByTestId('location').textContent;

export const pressEnter = (element: Element) => fireEvent.keyDown(element, { key: 'Enter', code: 'Enter', keyCode: 13 });

export const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

const clone = <T,>(data: T): T => JSON.parse(JSON.stringify(data));
const normalize = (url: string) => '/' + url.replace(/^\/+/, '');

export const httpError = (status = 500) =>
    Object.assign(new Error(`Request failed with status code ${status}`), { response: { status } });

type RouteResult = unknown;
type MockRoutes = Record<string, RouteResult | ((path: string) => RouteResult)>;

export function mockGet(routes: MockRoutes) {
    const impl = (url: string) => {
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

export function mockPost(result: unknown = {}) {
    const impl = () => result instanceof Error ? Promise.reject(result) : Promise.resolve({ data: result });
    categoryApi.post.mockImplementation(impl);
    channelApi.post.mockImplementation(impl);
}

export { categoryApi, channelApi };

export const aCategory = (overrides: Partial<Category> = {}): Category => ({
    id: 1, name: 'Minecraft', image: 'minecraft.png', ...overrides,
});

export const aChannel = (overrides: Partial<Channel> = {}): Channel => ({
    id: 1, name: 'steve', image: 'steve.png', preview: 'steve-preview.png',
    content: 'LembwKDo1Dk', channelTypeId: 1, ...overrides,
});

export const aComment = (overrides: Partial<Comment> = {}): Comment => ({
    created_at: '2024-01-01T10:00:00Z', author: 'alex', text: 'hello', ...overrides,
});
