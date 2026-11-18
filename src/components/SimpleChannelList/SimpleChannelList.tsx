import React from 'react';

import classes from './SimpleChannelList.module.css';
import SimpleChannelListItem from './SimpleChannelListItem/SimpleChannelListItem';
import type { Channel } from '../../types';

interface SimpleChannelListProps {
    channels: Channel[] | null;
    selectChannel: (name: string) => void;
}

const simpleChannelList = (props: SimpleChannelListProps) => {
    let channels = null;

    if (props.channels) {
        channels = props.channels.map(channel => (
            <SimpleChannelListItem
                key={channel.name}
                image={channel.image}
                name={channel.name}
                selectChannel={props.selectChannel}></SimpleChannelListItem>
        ));
    }

    return (
        <div className={classes.Container}>
            <p className={classes.Title}>Popular channels</p>

            {channels}
        </div>)
    ;

};

export default simpleChannelList;
