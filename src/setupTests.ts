import '@testing-library/jest-dom';

import categoryApi from './axios/axios-category';
import channelApi from './axios/axios-channel';
import io from 'socket.io-client';
import type { MockIo } from './__mocks__/socket.io-client';

declare global {
    // Tells React that the test environment supports act().
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('./axios/axios-category');
jest.mock('./axios/axios-channel');

if (!Element.prototype.scrollTo) {
    Element.prototype.scrollTo = () => {};
}

beforeEach(() => {
    const unmocked = (method: string) => (url: string) => Promise.reject(new Error(`Unmocked ${method} ${url}`));
    [categoryApi, channelApi].forEach(api => {
        jest.mocked(api.get).mockImplementation(unmocked('GET'));
        jest.mocked(api.post).mockImplementation(unmocked('POST'));
    });
    (io as unknown as MockIo).resetSockets();
    jest.spyOn(console, 'log').mockImplementation(() => {});
});
