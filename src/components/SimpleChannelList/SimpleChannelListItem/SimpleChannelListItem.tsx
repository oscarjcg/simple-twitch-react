import React from 'react';

import classes from './SimpleChannelListItem.module.css';

interface SimpleChannelListItemProps {
    image: string;
    name: string;
    selectChannel: (name: string) => void;
}

const simpleChannelListItem = (props: SimpleChannelListItemProps) => (
    <div className={classes.Container}>
        <img
            src={props.image}
            alt={props.name}
            height="30"
            className={classes.Image}
            onClick={() => props.selectChannel(props.name)}></img>
        <p
            className={classes.Title}
            onClick={() => props.selectChannel(props.name)}>{props.name}</p>
    </div>

);

export default simpleChannelListItem;
