import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';
import SearchBar from '../../../UI/SearchBar/SearchBar';
import SearchIcon from '../../../../shared/Icons/SearchIcon';

const navItems = (props) => (
    <ul className={classes.List}>
        <NavItem link="/" exact>Discover</NavItem>
        <NavItem link="/directory">Browse</NavItem>         
        <SearchBar></SearchBar>                  
        <SearchIcon 
            width={36} 
            fill="rgb(85, 85, 85)" 
            color="white"
            className={classes.Icon}></SearchIcon>          
    </ul> 
    
);
 
export default navItems;