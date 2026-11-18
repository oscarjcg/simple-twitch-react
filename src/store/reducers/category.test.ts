import reducer, { CategoryState } from './category';
import * as types from '../actions/actionTypes';
import { aCategory, aChannel } from '../../testUtils';

const initial: CategoryState = { categories: null, error: null, categoryChannels: null, category: null };

describe('category reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, { type: '@@INIT' })).toEqual(initial);
    });

    it('returns the same state for unknown actions', () => {
        const state = { ...initial };
        expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
    });

    it.each<[string, object, keyof CategoryState, unknown]>([
        [types.FETCH_CATEGORIES_SUCCESS, { categories: [aCategory({ name: 'A' })] }, 'categories', [aCategory({ name: 'A' })]],
        [types.FETCH_CATEGORY_CHANNELS_SUCCESS, { categoryChannels: [aChannel({ name: 'c' })] }, 'categoryChannels', [aChannel({ name: 'c' })]],
        [types.FETCH_CATEGORY_SUCCESS, { category: aCategory({ name: 'A' }) }, 'category', aCategory({ name: 'A' })],
    ])('%s stores the data and clears the error', (type, payload, key, expected) => {
        const state = reducer({ ...initial, error: 'old' }, { type, ...payload });
        expect(state[key]).toEqual(expected);
        expect(state.error).toBeNull();
    });

    it.each([
        types.FETCH_CATEGORIES_FAIL,
        types.FETCH_CATEGORY_CHANNELS_FAIL,
        types.FETCH_CATEGORY_FAIL,
    ])('%s stores the error and keeps the data', (type) => {
        const before: CategoryState = { ...initial, categories: [aCategory({ name: 'A' })] };
        const state = reducer(before, { type, error: 'boom' });
        expect(state.error).toBe('boom');
        expect(state.categories).toEqual([aCategory({ name: 'A' })]);
        expect(before.error).toBeNull();
    });
});
