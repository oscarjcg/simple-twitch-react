import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ChannelCont.module.css';
import Channel from '../../components/Channel/Channel';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/UI/Error/Error';

class ChannelCont extends Component {

    componentDidMount() {   
        this.props.onLoadChannels();
    }

    selectChannelHandler = (id) => {     
        this.props.history.push('/' + id);
    }

    render() {
        let height = window.innerHeight - this.props.headerHeight;

        let channel = null;
        if (this.props.channels) {
            channel = 
                this.props.channels.find(ch => {
                    return ch.name === this.props.match.params.channel;
                });
        };        

        let currentState = this.props.channelError ? <Error></Error> : <Spinner></Spinner>;

        return (
            <div className={classes.Content} style={{height: height}}>
                {channel ?
                    <Channel 
                        channel={channel}
                        selectChannel={this.selectChannelHandler}
                        ></Channel> 
                    : currentState}                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        headerHeight: state.userInterface.headerHeight,
        channels: state.channel.channels,
        channelError: state.channel.error
    };
};

const mapDispatchToProps = dispatch => {
    return {   
        onLoadChannels: () => dispatch(actions.fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCont);