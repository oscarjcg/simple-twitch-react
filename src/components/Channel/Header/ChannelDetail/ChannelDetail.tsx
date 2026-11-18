import React from 'react';

import classes from './ChannelDetail.module.css';

interface ChannelDetailProps {
    image: string;
    name: string;
    selectChannel: (name: string) => void;
}

const channelDetail = (props: ChannelDetailProps) => (
    <div className={classes.Details}>
        <img
            src={props.image}
            alt={props.name}
            height="40px"></img>
        <p
            onClick={() => props.selectChannel(props.name)}
            className={classes.ChannelName}>
                {props.name}
        </p>
    </div>
);

export default channelDetail;
