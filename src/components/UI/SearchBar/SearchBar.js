import React from 'react';

import classes from './SearchBar.module.css';

const searchBar = (props) => (
    <div className={[classes.SearchBar, classes.ActivePurple].join(' ')}>
        <input type="text" placeholder="Search"></input>
    </div>
);

export default searchBar;