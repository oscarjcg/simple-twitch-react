import React from 'react';

import classes from './NavTab.module.css';
import NavItem from '../../Navigation/NavBar/NavItems/NavItem/NavItem';

const navTab = (props) => (
    <ul className={classes.List}>
        <NavItem link="/directory" exact>Categories</NavItem>
        <NavItem link="/directory/all" exact>Live Channels</NavItem>
    </ul> 
);

export default navTab;