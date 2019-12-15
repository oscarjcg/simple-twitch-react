import React from 'react';

import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    props.items.map(item => (
        <NavItem key={item.link} link={item.link} exact={item.exact}>{item.text}</NavItem>
    ))
);
 
export default navItems;