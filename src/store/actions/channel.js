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
        axios.get('/api/channel')
            .then(res => {
                let channels = res.data.map(channel => {
                    channel.type = channel.channelTypeId;
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
        axios.get('/api/channel/byname/' + channelName)
            .then(res => {
                let channel = res.data;
                channel.type = channel.channelTypeId;
                dispatch(fetchChannelByNameSuccess(channel));
            })
            .catch(err => {
                dispatch(fetchChannelByNameFail(err));        
            });
    };
};