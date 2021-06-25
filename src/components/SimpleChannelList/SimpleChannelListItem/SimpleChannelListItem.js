import React from 'react';

import classes from './SimpleChannelListItem.module.css';

const simpleChannelListItem = (props) => (
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