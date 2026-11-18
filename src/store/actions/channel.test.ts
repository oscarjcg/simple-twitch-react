import { createAppStore, AppStore } from '../index';
import * as actions from './index';
import { mockGet, httpError, flushPromises, channelApi, aChannel } from '../../testUtils';

describe('channel actions', () => {
    let store: AppStore;
    beforeEach(() => { store = createAppStore(); });

    it('fetchChannels loads the channels and maps channelTypeId to type', async () => {
        mockGet({ '/api/channel': [aChannel({ channelTypeId: 1 }), aChannel({ id: 2, name: 'alex', channelTypeId: 2 })] });

        store.dispatch(actions.fetchChannels());
        await flushPromises();

        expect(channelApi.get).toHaveBeenCalledWith('/api/channel');
        const channels = store.getState().channel.channels;
        expect(channels!.map(c => [c.name, c.type])).toEqual([['steve', 1], ['alex', 2]]);
    });

    it('fetchChannels stores the error on failure', async () => {
        mockGet({ '/api/channel': httpError(500) });

        store.dispatch(actions.fetchChannels());
        await flushPromises();

        expect(store.getState().channel.channels).toBeNull();
        expect(store.getState().channel.error).toBeTruthy();
    });

    it('fetchByNameChannel loads one channel and maps channelTypeId to type', async () => {
        mockGet({ '/api/channel/byname/steve': aChannel({ channelTypeId: 2 }) });

        store.dispatch(actions.fetchByNameChannel('steve'));
        await flushPromises();

        expect(store.getState().channel.channel).toMatchObject({ name: 'steve', type: 2 });
    });

    it('fetchByNameChannel stores the error on failure', async () => {
        mockGet({ '/api/channel/byname/nobody': httpError(404) });

        store.dispatch(actions.fetchByNameChannel('nobody'));
        await flushPromises();

        expect(store.getState().channel.channel).toBeNull();
        expect((store.getState().channel.error as { response: { status: number } }).response.status).toBe(404);
    });
});
