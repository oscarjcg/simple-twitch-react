import React from 'react';

import classes from './SearchBar.module.css';
import SearchIcon from '../../../shared/Icons/SearchIcon';

const searchBar = (props) => (
    <div>
        <div className={[classes.SearchBar, classes.ActivePurple].join(' ')}>
            <input 
                type="text" 
                placeholder="Search" 
                onChange={props.search}
                onKeyDown={props.search}></input>        
        </div>

        <div 
            className={classes.IconContainer} 
            onClick={props.searchButton}>
            <SearchIcon 
                width={36} 
                fill="rgb(85, 85, 85)" 
                color="white"
                className={classes.Icon}></SearchIcon> 
        </div>
    </div>
    
);

export default searchBar;