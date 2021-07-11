import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    channels: null,
    channel: null,
    error: null
};

const fetchChannelsSuccess = (state, action) => {
    return updateObject(state, {
        channels: action.channels, 
        error: null
    });
};

const fetchChannelsFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const fetchByNameChannelSuccess = (state, action) => {
    return updateObject(state, {
        channel: action.channel, 
        error: null
    });
};

const fetchByNameChannelFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
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