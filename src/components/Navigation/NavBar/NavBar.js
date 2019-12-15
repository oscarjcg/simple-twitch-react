import React from 'react';

import NavItems from './NavItems/NavItems';
import classes from './NavBar.module.css';
import SearchBar from '../../UI/SearchBar/SearchBar';

const navBar = (props) => (
    <header>      
        <nav>      
            <ul className={classes.List}>
                <p className={classes.Brand}>Simple Twitch</p>
                <NavItems items={props.items}></NavItems>
                <SearchBar></SearchBar>    
            </ul>                 
        </nav>
    </header>
);
 
export default navBar;