import reducer from './comment';
import * as types from '../actions/actionTypes';

const initial = { comments: null, error: null, updateComments: null };

describe('comment reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, { type: '@@INIT' })).toEqual(initial);
    });

    it('returns the same state for unknown actions', () => {
        const state = { ...initial };
        expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
    });

    it('FETCH_COMMENTS_SUCCESS stores the comments and clears the error', () => {
        const comments = [{ author: 'a', comment: 'hi' }];
        const state = reducer({ ...initial, error: 'old' }, { type: types.FETCH_COMMENTS_SUCCESS, comments });
        expect(state.comments).toEqual(comments);
        expect(state.error).toBeNull();
    });

    it('FETCH_COMMENTS_FAIL stores the error', () => {
        expect(reducer(initial, { type: types.FETCH_COMMENTS_FAIL, error: 'boom' }).error).toBe('boom');
    });

    it('ADD_COMMENT_SUCCESS clears the error', () => {
        expect(reducer({ ...initial, error: 'old' }, { type: types.ADD_COMMENT_SUCCESS }).error).toBeNull();
    });

    it('ADD_COMMENT_FAIL is ignored (current behavior)', () => {
        const state = { ...initial };
        expect(reducer(state, { type: types.ADD_COMMENT_FAIL, error: 'boom' })).toBe(state);
    });

    it('UPDATE_COMMENTS_SUCCESS stores the update flag', () => {
        expect(reducer(initial, { type: types.UPDATE_COMMENTS_SUCCESS, updateComments: true }).updateComments).toBe(true);
    });
});
