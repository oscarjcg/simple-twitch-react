import axios from '../../axios/axios-channel';

import * as actionTypes from './actionTypes';


export const fetchChannelsSuccess = (channels) => {
    return {
        type: actionTypes.FETCH_CHANNELS_SUCCESS,
        channels: channels
    }
};

export const fetchChannels = () => {
    return dispatch => {
        axios.get('/channels')
            .then(res => {
                let channels = res.data.map(channel => {
                    let image = 'data:image/jpeg;base64, ' + new Buffer(channel.image.data.data).toString('base64');
                    let preview = 'data:image/jpeg;base64, ' + new Buffer(channel.preview.data.data).toString('base64');
                    return {
                        ...channel,
                        image: image,
                        preview: preview
                    };
                });
                dispatch(fetchChannelsSuccess(channels));
            })
            .catch(err => {
                console.log(err);
            });
    };
};