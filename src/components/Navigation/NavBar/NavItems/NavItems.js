import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';

const navItems = (props) => (
    <ul className={classes.List}>
        <NavItem link="/" exact>Discover</NavItem>
        <NavItem link="/directory">Browse</NavItem>
    </ul> 
);
 
export default navItems;