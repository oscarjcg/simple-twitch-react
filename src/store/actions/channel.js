import axios from '../../axios/axios-channel';

import * as actionTypes from './actionTypes';


export const fetchChannelsSuccess = (channels) => {
    return {
        type: actionTypes.FETCH_CHANNELS_SUCCESS,
        channels: channels
    }
};

export const fetchChannelsFail = (error) => {
    return {
        type: actionTypes.FETCH_CHANNELS_FAIL,
        error: error
    }
};

export const fetchChannels = () => {
    return dispatch => {
        axios.get('/channels')
            .then(res => {
                let channels = res.data.map(channel => {
                    return {
                        ...channel
                    };
                });
                dispatch(fetchChannelsSuccess(channels));
            })
            .catch(err => {
                dispatch(fetchChannelsFail(err));        
            });
    };
};

export const fetchChannelByNameSuccess = (channel) => {
    return {
        type: actionTypes.FETCH_CHANNEL_SUCCESS,
        channel: channel
    }
};

export const fetchChannelByNameFail = (error) => {
    return {
        type: actionTypes.FETCH_CHANNEL_FAIL,
        error: error
    }
};

export const fetchByNameChannel = (channelName) => {
    return dispatch => {
        axios.get('/channels/name/' + channelName)
            .then(res => {
                let channel = res.data;
                dispatch(fetchChannelByNameSuccess(channel));
            })
            .catch(err => {
                dispatch(fetchChannelByNameFail(err));        
            });
    };
};