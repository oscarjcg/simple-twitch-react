import { createAppStore, AppStore } from '../index';
import * as actions from './index';
import { mockGet, httpError, flushPromises, categoryApi, aCategory, aChannel } from '../../testUtils';

describe('category actions', () => {
    let store: AppStore;
    beforeEach(() => { store = createAppStore(); });

    it('fetchCategories loads every category', async () => {
        mockGet({ '/api/category': [aCategory(), aCategory({ id: 2, name: 'Zelda' })] });

        store.dispatch(actions.fetchCategories());
        await flushPromises();

        expect(categoryApi.get).toHaveBeenCalledWith('/api/category');
        expect(store.getState().category.categories!.map(c => c.name)).toEqual(['Minecraft', 'Zelda']);
        expect(store.getState().category.error).toBeNull();
    });

    it('fetchCategories stores the error on failure', async () => {
        const error = httpError(500);
        mockGet({ '/api/category': error });

        store.dispatch(actions.fetchCategories());
        await flushPromises();

        expect(store.getState().category.categories).toBeNull();
        expect(store.getState().category.error).toBe(error);
    });

    it('fetchCategoryChannels loads the channels of a category by name', async () => {
        mockGet({ '/api/category/byname/Minecraft/channels': [aChannel()] });

        store.dispatch(actions.fetchCategoryChannels('Minecraft'));
        await flushPromises();

        expect(store.getState().category.categoryChannels).toEqual([aChannel()]);
    });

    it('fetchCategoryChannels stores the error on failure', async () => {
        mockGet({ '/api/category/byname/Minecraft/channels': httpError(404) });

        store.dispatch(actions.fetchCategoryChannels('Minecraft'));
        await flushPromises();

        expect((store.getState().category.error as { response: { status: number } }).response.status).toBe(404);
    });

    it('fetchCategoryByName loads one category', async () => {
        mockGet({ '/api/category/byname/Minecraft': aCategory() });

        store.dispatch(actions.fetchCategoryByName('Minecraft'));
        await flushPromises();

        expect(store.getState().category.category).toEqual(aCategory());
    });

    it('fetchCategoryByName stores the error on failure', async () => {
        mockGet({ '/api/category/byname/Nope': httpError(404) });

        store.dispatch(actions.fetchCategoryByName('Nope'));
        await flushPromises();

        expect(store.getState().category.category).toBeNull();
        expect(store.getState().category.error).toBeTruthy();
    });
});
