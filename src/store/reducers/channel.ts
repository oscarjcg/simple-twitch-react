import type { UnknownAction } from '@reduxjs/toolkit';

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import type { Channel, RequestError } from '../../types';

export interface ChannelState {
    channels: Channel[] | null;
    channel: Channel | null;
    error: RequestError | null;
}

interface ChannelAction {
    type: string;
    channels?: Channel[];
    channel?: Channel;
    error?: RequestError;
}

const initialState: ChannelState = {
    channels: null,
    channel: null,
    error: null
};

const fetchChannelsSuccess = (state: ChannelState, action: ChannelAction) => {
    return updateObject(state, {
        channels: action.channels,
        error: null
    });
};

const fetchChannelsFail = (state: ChannelState, action: ChannelAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const fetchByNameChannelSuccess = (state: ChannelState, action: ChannelAction) => {
    return updateObject(state, {
        channel: action.channel,
        error: null
    });
};

const fetchByNameChannelFail = (state: ChannelState, action: ChannelAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const reducer = (state: ChannelState = initialState, unknownAction: UnknownAction): ChannelState => {
    const action = unknownAction as ChannelAction;
    switch(action.type) {
        case actionTypes.FETCH_CHANNELS_SUCCESS:
            return fetchChannelsSuccess(state, action);
        case actionTypes.FETCH_CHANNELS_FAIL:
            return fetchChannelsFail(state, action);
        case actionTypes.FETCH_CHANNEL_SUCCESS:
            return fetchByNameChannelSuccess(state, action);
        case actionTypes.FETCH_CHANNEL_FAIL:
            return fetchByNameChannelFail(state, action);
        default:
            return state;
    };
};

export default reducer;
