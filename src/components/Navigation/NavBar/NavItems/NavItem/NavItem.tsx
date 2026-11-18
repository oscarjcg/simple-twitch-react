import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';

interface NavItemProps {
    link: string;
    exact?: boolean;
    children?: React.ReactNode;
}

const navItem = (props: NavItemProps) => (
    <li className={classes.Item}>
        <NavLink
            to={props.link}
            end={props.exact}
            className={({ isActive }) => isActive ? classes.active : undefined}>
            {props.children}
        </NavLink>
    </li>
);

export default navItem;
