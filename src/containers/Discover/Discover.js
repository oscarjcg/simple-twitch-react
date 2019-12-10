import React, { Component } from 'react';

import classes from './Discover.module.css';

class Discover extends Component {

    render () {
        let headerHeight = 54;
        let height = window.innerHeight - headerHeight;

        return (
            <div className={classes.Content} style={{height: height}}>
                <h1 className={classes.Title}>Discover</h1>            
            </div>          
        );
    }
}

export default Discover;