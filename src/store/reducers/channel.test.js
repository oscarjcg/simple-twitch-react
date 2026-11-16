import reducer from './channel';
import * as types from '../actions/actionTypes';

const initial = { channels: null, channel: null, error: null };

describe('channel reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, { type: '@@INIT' })).toEqual(initial);
    });

    it('returns the same state for unknown actions', () => {
        const state = { ...initial };
        expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
    });

    it('FETCH_CHANNELS_SUCCESS stores the channels and clears the error', () => {
        const state = reducer({ ...initial, error: 'old' }, { type: types.FETCH_CHANNELS_SUCCESS, channels: [{ name: 'a' }] });
        expect(state).toEqual({ channels: [{ name: 'a' }], channel: null, error: null });
    });

    it('FETCH_CHANNEL_SUCCESS stores the channel and clears the error', () => {
        const state = reducer({ ...initial, error: 'old' }, { type: types.FETCH_CHANNEL_SUCCESS, channel: { name: 'a' } });
        expect(state).toEqual({ channels: null, channel: { name: 'a' }, error: null });
    });

    it.each([types.FETCH_CHANNELS_FAIL, types.FETCH_CHANNEL_FAIL])('%s stores the error', (type) => {
        const state = reducer({ ...initial, channel: { name: 'a' } }, { type, error: 'boom' });
        expect(state.error).toBe('boom');
        expect(state.channel).toEqual({ name: 'a' });
    });
});
