import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Discover.module.css';

class Discover extends Component {

    render () {
        let height = window.innerHeight - this.props.headerHeight;

        return (
            <div className={classes.Content} style={{height: height}}>
                <h1 className={classes.Title}>Discover</h1>            
            </div>          
        );
    }
}

const mapStateToProps = state => {
    return {
      headerHeight: state.userInterface.headerHeight
    };
  };

export default connect(mapStateToProps)(Discover);