import React from 'react';

import ChannelListItem from './ChannelListItem/ChannelListItem';
import classes from './ChannelList.module.css';
import Spinner from '../UI/Spinner/Spinner';

const channelList = (props) => {
    
    let channels = null;
    let spinner = null;
    if (props.channels) {
        channels = props.channels.map(channel => (
            <ChannelListItem
                key={channel.name}
                name={channel.name}
                preview={channel.preview}
                image={channel.image}></ChannelListItem>
        ));
    }
    else {
        spinner = <Spinner></Spinner>;
    }
            
    return (            
        <div className={classes.MainContainer}>
            {spinner}
            {channels}
        </div>            
    ); 
    
}

export default channelList;