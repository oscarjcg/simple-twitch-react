import React from 'react';

import classes from './CategoryListItem.module.css';
import NavItem from '../../Navigation/NavBar/NavItems/NavItem/NavItem';

const categoryListItem = (props) => (
    <div className={classes.MainContainer}>
        <img 
            src={props.image} 
            alt={props.name} 
            width="150"
            ></img>    
        <a 
            className={classes.Item}
            onClick={props.selectCategory}>{props.name}</a>
    </div>    
);

export default categoryListItem;