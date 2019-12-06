import React from 'react';

import NavItems from './NavItems/NavItems';

const navBar = (props) => (
    <header>
        {/* Logo, Search bar */}

        <nav>      
            <NavItems></NavItems>
        </nav>
    </header>
);

export default navBar;