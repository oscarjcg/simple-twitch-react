import React from 'react';

import classes from './ChannelListItem.module.css';
import ChannelDetail from '../../Channel/Header/ChannelDetail/ChannelDetail';

interface ChannelListItemProps {
    name: string;
    preview: string;
    image: string;
    selectChannel: (name: string) => void;
}

const channelListItem = (props: ChannelListItemProps) => (
    <div className={classes.MainContainer}>
        <img
            className={classes.Image}
            src={props.preview}
            alt={props.name}
            onClick={() => props.selectChannel(props.name)}
            width="300"></img>
        <ChannelDetail
            image={props.image}
            name={props.name}
            selectChannel={props.selectChannel}></ChannelDetail>
    </div>
);

export default channelListItem;
