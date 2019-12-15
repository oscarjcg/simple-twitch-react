import React from 'react';

import classes from './NavTab.module.css';
import NavItems from '../../Navigation/NavBar/NavItems/NavItems';

const navTab = (props) => (
    <ul className={classes.List}>      
        <NavItems items={props.tabs}></NavItems>
    </ul> 
);

export default navTab;