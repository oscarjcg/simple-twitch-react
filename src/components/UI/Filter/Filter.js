import React from 'react';

import classes from './Filter.module.css';
import SearchBar from '../SearchBar/SearchBar';

const filter = (props) => (
    <div className={classes.Search}>
        <p className={classes.Text}>Filter By:</p>              
        <SearchBar></SearchBar> 
    </div>
);

export default filter;