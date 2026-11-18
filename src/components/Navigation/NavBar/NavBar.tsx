import React from 'react';

import NavItems from './NavItems/NavItems';
import classes from './NavBar.module.css';
import SearchBar from '../../UI/SearchBar/SearchBar';
import type { NavItemData, SearchHandler, SearchResult, SearchResultType } from '../../../types';

interface NavBarProps {
    items: NavItemData[];
    search: SearchHandler;
    searchButton: () => void;
    searchResult: SearchResult[] | null;
    selectSearch: (type: SearchResultType, name: string) => void;
    visibilitySearchResults: (visibility: boolean) => void;
}

const navBar = (props: NavBarProps) => (
    <header>
        <nav className={classes.Nav}>
            <ul className={classes.List}>
                <p className={classes.Brand}>Simple Twitch</p>
                <NavItems items={props.items}></NavItems>

            </ul>
            <SearchBar
                search={props.search}
                searchButton={props.searchButton}
                searchResult={props.searchResult}
                selectSearch={props.selectSearch}
                visibilitySearchResults={props.visibilitySearchResults}></SearchBar>
        </nav>
    </header>
);

export default navBar;
