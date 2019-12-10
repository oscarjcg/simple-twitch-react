import React from 'react';

import classes from './NavTab.module.css';
import NavItem from '../../Navigation/NavBar/NavItems/NavItem/NavItem';

const navTab = (props) => (
    <ul className={classes.List}>
        {props.tabs.map(tab => (
            <NavItem key={tab.link} link={tab.link} exact>{tab.text}</NavItem>
        ))}   
    </ul> 
);

export default navTab;