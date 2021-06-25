import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './SimpleChannelListCont.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/UI/Error/Error';
import SimpleChannelList from '../../components/SimpleChannelList/SimpleChannelList';
import { withRouter } from 'react-router-dom';


class SimpleChannelListCont extends Component {
    componentDidMount() {   
        this.props.onLoadChannels();

    }

    selectChannelHandler = (id) => {     
        this.props.history.push('/' + id);
    }

    render() {

        return (
            <SimpleChannelList
                selectChannel={this.selectChannelHandler}
                channels={this.props.channels}
                ></SimpleChannelList>
        );
    }
}

const mapStateToProps = state => {
    return {
        channels: state.channel.channels,
        channelError: state.channel.error, 
    };
};

const mapDispatchToProps = dispatch => {
    return {   
        onLoadChannels: () => dispatch(actions.fetchChannels()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SimpleChannelListCont));