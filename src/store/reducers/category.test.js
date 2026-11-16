import reducer from './category';
import * as types from '../actions/actionTypes';

const initial = { categories: null, error: null, categoryChannels: null, category: null };

describe('category reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, { type: '@@INIT' })).toEqual(initial);
    });

    it('returns the same state for unknown actions', () => {
        const state = { ...initial };
        expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
    });

    it.each([
        [types.FETCH_CATEGORIES_SUCCESS, { categories: [{ name: 'A' }] }, 'categories', [{ name: 'A' }]],
        [types.FETCH_CATEGORY_CHANNELS_SUCCESS, { categoryChannels: [{ name: 'c' }] }, 'categoryChannels', [{ name: 'c' }]],
        [types.FETCH_CATEGORY_SUCCESS, { category: { name: 'A' } }, 'category', { name: 'A' }],
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
        const before = { ...initial, categories: [{ name: 'A' }] };
        const state = reducer(before, { type, error: 'boom' });
        expect(state.error).toBe('boom');
        expect(state.categories).toEqual([{ name: 'A' }]);
        expect(before.error).toBeNull();
    });
});
