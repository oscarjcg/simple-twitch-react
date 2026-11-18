import axios from '../../axios/axios-channel';

import * as actionTypes from './actionTypes';
import type { AppThunk } from '../index';
import type { Channel, RequestError } from '../../types';


export const fetchChannelsSuccess = (channels: Channel[]) => {
    return {
        type: actionTypes.FETCH_CHANNELS_SUCCESS,
        channels: channels
    }
};

export const fetchChannelsFail = (error: RequestError) => {
    return {
        type: actionTypes.FETCH_CHANNELS_FAIL,
        error: error
    }
};

export const fetchChannels = (): AppThunk => {
    return dispatch => {
        axios.get<Channel[]>('/api/channel')
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

export const fetchChannelByNameSuccess = (channel: Channel) => {
    return {
        type: actionTypes.FETCH_CHANNEL_SUCCESS,
        channel: channel
    }
};

export const fetchChannelByNameFail = (error: RequestError) => {
    return {
        type: actionTypes.FETCH_CHANNEL_FAIL,
        error: error
    }
};

export const fetchByNameChannel = (channelName: string): AppThunk => {
    return dispatch => {
        axios.get<Channel>('/api/channel/byname/' + channelName)
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
