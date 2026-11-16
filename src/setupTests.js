import '@testing-library/jest-dom';

import categoryApi from './axios/axios-category';
import channelApi from './axios/axios-channel';
import io from 'socket.io-client';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('./axios/axios-category');
jest.mock('./axios/axios-channel');

if (!Element.prototype.scrollTo) {
    Element.prototype.scrollTo = () => {};
}

beforeEach(() => {
    const unmocked = (method) => (url) => Promise.reject(new Error(`Unmocked ${method} ${url}`));
    [categoryApi, channelApi].forEach(api => {
        api.get.mockImplementation(unmocked('GET'));
        api.post.mockImplementation(unmocked('POST'));
    });
    io.resetSockets();
    jest.spyOn(console, 'log').mockImplementation(() => {});
});
