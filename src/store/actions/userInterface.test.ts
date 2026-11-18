import { createAppStore, AppStore } from '../index';
import * as actions from './index';
import { mockGet, httpError, flushPromises, categoryApi } from '../../testUtils';

describe('userInterface actions', () => {
    let store: AppStore;
    const ui = () => store.getState().userInterface;
    beforeEach(() => { store = createAppStore(); });

    it('updates the simple UI values', () => {
        store.dispatch(actions.updateHeaderHeight(55));
        store.dispatch(actions.updateHeaderChannelWidth(900));
        store.dispatch(actions.updateSearchText('mine'));
        store.dispatch(actions.updateSearchTextTemp('min'));
        store.dispatch(actions.updateNavBarSearchText('nav'));
        store.dispatch(actions.visibilityNavBarSearchResults(true));
        store.dispatch(actions.updateRecommendedListMore('categories', true));

        expect(ui()).toMatchObject({
            headerHeight: 55,
            headerChannelWidth: 900,
            searchText: 'mine',
            searchTextTemp: 'min',
            navBarSearchText: 'nav',
            visibilityNavBarSearchResults: true,
            recommendedListMore: { categories: true },
        });
    });

    it.each([null, ''] as const)('fetchSearchResults(%p) clears the results without calling the API', async (text) => {
        store.dispatch(actions.fetchSearchResults(text));
        await flushPromises();

        expect(categoryApi.get).not.toHaveBeenCalled();
        expect(ui().searchResults).toBeNull();
    });

    it('fetchSearchResults merges channels and categories, tagging each with its type', async () => {
        mockGet({
            '/api/search/mi': {
                channels: [{ name: 'mike' }],
                categories: [{ name: 'Minecraft' }],
            },
        });

        store.dispatch(actions.fetchSearchResults('mi'));
        await flushPromises();

        expect(ui().searchResults).toEqual([
            { name: 'mike', type: 'channel' },
            { name: 'Minecraft', type: 'category' },
        ]);
    });

    it('fetchSearchResults stores the error on failure', async () => {
        mockGet({ '/api/search/mi': httpError(500) });

        store.dispatch(actions.fetchSearchResults('mi'));
        await flushPromises();

        expect(ui().error).toBeTruthy();
    });
});
