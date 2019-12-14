import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ChannelCont.module.css';
import Channel from '../../components/Channel/Channel';

class ChannelCont extends Component {

    render() {
        let height = window.innerHeight - this.props.headerHeight;

        return (
            <div className={classes.Content} style={{height: height}}>
                <Channel></Channel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      headerHeight: state.userInterface.headerHeight
    };
  };

export default connect(mapStateToProps)(ChannelCont);