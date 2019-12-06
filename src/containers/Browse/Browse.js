import React, { Component } from 'react';

import classes from './Browse.module.css';
import NavTab from '../../components/Navigation/NavTab/NavTab';

class Browse extends Component {

    render () {
        return (
            <div className={classes.Content}>
                <h1 className={classes.Title}>Browse</h1>
                <NavTab></NavTab>
                <h2 className={classes.Title}>Search</h2>
            </div>
        );
    }
}

export default Browse;