import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';
import SearchBar from '../../../UI/SearchBar/SearchBar';

const navItems = (props) => (
    <ul className={classes.List}>
        <p className={classes.Brand}>Simple Twitch</p>
        <NavItem link="/" exact>Discover</NavItem>
        <NavItem link="/directory">Browse</NavItem>         
        <SearchBar></SearchBar>    
    </ul>     
);
 
export default navItems;