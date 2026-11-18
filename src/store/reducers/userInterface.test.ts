import reducer, { UserInterfaceState } from './userInterface';
import * as types from '../actions/actionTypes';

const initial = reducer(undefined, { type: '@@INIT' });

describe('userInterface reducer', () => {
    it('returns the initial state', () => {
        expect(initial).toEqual({
            headerHeight: null,
            headerChannelWidth: null,
            searchText: null,
            searchTextTemp: null,
            navBarSearchText: null,
            searchResults: null,
            visibilityNavBarSearchResults: false,
            recommendedListMore: {},
        });
    });

    it('returns the same state for unknown actions', () => {
        expect(reducer(initial, { type: 'UNKNOWN' })).toBe(initial);
    });

    it.each<[string, object, keyof UserInterfaceState, unknown]>([
        [types.UPDATE_HEADER_HEIGHT, { headerHeight: 60 }, 'headerHeight', 60],
        [types.UPDATE_HEADER_CHANNEL_WIDTH, { headerChannelWidth: 800 }, 'headerChannelWidth', 800],
        [types.UPDATE_SEARCH_TEXT, { searchText: 'abc' }, 'searchText', 'abc'],
        [types.UPDATE_SEARCH_TEXT_TEMP, { searchText: 'ab' }, 'searchTextTemp', 'ab'],
        [types.UPDATE_NAVBAR_SEARCH_TEXT, { searchText: 'nav' }, 'navBarSearchText', 'nav'],
        [types.VISIBILITY_NAVBAR_SEARCH_RESULTS, { visibilityNavBarSearchResults: true }, 'visibilityNavBarSearchResults', true],
    ])('%s sets the value', (type, payload, key, expected) => {
        expect(reducer(initial, { type, ...payload })[key]).toEqual(expected);
    });

    it('FETCH_NAVBAR_SEARCH_RESULTS_SUCCESS stores results and clears the error', () => {
        const state = reducer({ ...initial, error: 'old' }, { type: types.FETCH_NAVBAR_SEARCH_RESULTS_SUCCESS, searchResults: [{ name: 'a' }] });
        expect(state.searchResults).toEqual([{ name: 'a' }]);
        expect(state.error).toBeNull();
    });

    it('FETCH_NAVBAR_SEARCH_RESULTS_FAIL stores the error', () => {
        expect(reducer(initial, { type: types.FETCH_NAVBAR_SEARCH_RESULTS_FAIL, error: 'boom' }).error).toBe('boom');
    });

    it('UPDATE_RECOMMENDED_LIST_MORE sets one key without mutating the previous object', () => {
        const first = reducer(initial, { type: types.UPDATE_RECOMMENDED_LIST_MORE, name: 'categories', value: true });
        const second = reducer(first, { type: types.UPDATE_RECOMMENDED_LIST_MORE, name: 'Simulation', value: false });

        expect(second.recommendedListMore).toEqual({ categories: true, Simulation: false });
        expect(first.recommendedListMore).toEqual({ categories: true });
        expect(initial.recommendedListMore).toEqual({});
    });
});
