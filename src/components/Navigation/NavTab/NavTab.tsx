import React from 'react';

import classes from './NavTab.module.css';
import NavItems from '../../Navigation/NavBar/NavItems/NavItems';
import type { NavItemData } from '../../../types';

interface NavTabProps {
    tabs: NavItemData[];
}

const navTab = (props: NavTabProps) => (
    <ul className={classes.List}>
        <NavItems items={props.tabs}></NavItems>
    </ul>
);

export default navTab;
