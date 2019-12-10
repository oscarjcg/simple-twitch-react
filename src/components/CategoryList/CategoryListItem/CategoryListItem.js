import React from 'react';

import classes from './CategoryListItem.module.css';

const categoryListItem = (props) => (
    <div className={classes.MainContainer}>
        <img 
            className={classes.Image}
            src={props.image} 
            alt={props.name}             
            onClick={() => props.selectCategory(props.name)}
            ></img>    
        <p             
            className={classes.Item}
            onClick={() => props.selectCategory(props.name)}>{props.name}</p>
    </div>    
);

export default categoryListItem;