import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import SimpleChannelList from '../../components/SimpleChannelList/SimpleChannelList';
import withRouter from '../../shared/withRouter';


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