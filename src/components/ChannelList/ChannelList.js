import React from 'react';

import ChannelListItem from './ChannelListItem/ChannelListItem';
import classes from './ChannelList.module.css';

const channelList = (props) => {
    
    let channels = null
    if (props.channels) {
        channels = props.channels.map(channel => (
            <ChannelListItem
                key={channel.name}
                name={channel.name}
                preview={channel.preview}
                image={channel.image}></ChannelListItem>
        ));
    };
            
    return (            
        <div className={classes.MainContainer}>
            {channels}
        </div>            
    ); 
    
}

export default channelList;