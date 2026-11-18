import React from 'react';

import ChannelListItem from './ChannelListItem/ChannelListItem';
import classes from './ChannelList.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Error from '../UI/Error/Error';
import type { Channel, RequestError } from '../../types';

interface ChannelListProps {
    channels: Channel[] | null;
    selectChannel: (name: string) => void;
    error?: RequestError | null;
}

const channelList = (props: ChannelListProps) => {

    let channels = null;
    let currentState = null;
    if (props.channels) {
        channels = props.channels.map(channel => (
            <ChannelListItem
                key={channel.name}
                name={channel.name}
                preview={channel.preview}
                image={channel.image}
                selectChannel={props.selectChannel}></ChannelListItem>
        ));
    }
    else {
        currentState = props.error ? <Error></Error> : <Spinner></Spinner>;
    }

    return (
        <div className={classes.MainContainer}>
            {currentState}
            {channels}
        </div>
    );

}

export default channelList;
