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