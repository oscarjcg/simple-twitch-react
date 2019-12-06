import React, { Component } from 'react';

import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

class Layout extends Component {

    render () {
        return (
            <React.Fragment>
                <NavBar></NavBar>
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
            
        )
    }
}

export default Layout;