import React from 'react';

import classes from './ChannelListItem.module.css';
import ChannelDetail from '../../Channel/Header/ChannelDetail/ChannelDetail';

const channelListItem = (props) => (    
    <div className={classes.MainContainer}>
        <img 
            src={props.preview}
            alt={props.name}
            width="300"></img>
        <ChannelDetail
            image={props.image}
            name={props.name}
            selectChannel={props.selectChannel}></ChannelDetail>
    </div>          
);

export default channelListItem;