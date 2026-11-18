import React from 'react';

import NavItem from './NavItem/NavItem';
import type { NavItemData } from '../../../../types';

interface NavItemsProps {
    items: NavItemData[];
}

const navItems = (props: NavItemsProps) => (
    props.items.map(item => (
        <NavItem key={item.link} link={item.link} exact={item.exact}>{item.text}</NavItem>
    ))
);

export default navItems;
