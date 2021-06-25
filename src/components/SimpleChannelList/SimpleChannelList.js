import React from 'react';

import classes from './SimpleChannelList.module.css';
import SimpleChannelListItem from './SimpleChannelListItem/SimpleChannelListItem';


const simpleChannelList = (props) => {
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