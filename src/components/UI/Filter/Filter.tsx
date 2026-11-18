import React from 'react';

import classes from './Filter.module.css';
import SearchBar from '../SearchBar/SearchBar';
import type { SearchHandler } from '../../../types';

interface FilterProps {
    search: SearchHandler;
    searchButton: () => void;
}

const filter = (props: FilterProps) => (
    <div className={classes.Search}>
        <p className={classes.Text}>Filter By:</p>
        <SearchBar
            search={props.search}
            searchButton={props.searchButton}></SearchBar>
    </div>
);

export default filter;
