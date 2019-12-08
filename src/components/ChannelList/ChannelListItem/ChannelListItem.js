import React from 'react';

import classes from './ChannelListItem.module.css';

const channelListItem = (props) => (    
    <div className={classes.MainContainer}>
        <img 
            src={props.preview}
            alt={props.name}
            width="300"></img>
        <div>
            <img 
                src={props.image} 
                alt={props.name}
                height="40px"></img>
            <a className={classes.ChannelName}>{props.name}</a>
        </div>
    </div>          
);

export default channelListItem;