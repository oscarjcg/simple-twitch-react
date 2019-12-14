import React from 'react';

import classes from './ChannelListItem.module.css';

const channelListItem = (props) => (    
    <div className={classes.MainContainer}>
        <img 
            src={props.preview}
            alt={props.name}
            width="300"></img>
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
    </div>          
);

export default channelListItem;