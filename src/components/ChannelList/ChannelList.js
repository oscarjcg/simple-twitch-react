import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChannelListItem from './ChannelListItem/ChannelListItem';
import * as actions from '../../store/actions/index';
import classes from './ChannelList.module.css';

class ChannelList extends Component {

    componentDidMount() {
        this.props.onLoadList();
    }

    render () {
        let channels = null
        if (this.props.channels) {
            channels = this.props.channels.map(channel => (
                <ChannelListItem
                    key={channel.name}
                    name={channel.name}
                    preview={channel.preview}
                    image={channel.image}></ChannelListItem>
            ));
        };
             
        return (            
            <div className={classes.MainContainer}>
                {channels}
            </div>            
        ); 
    }
}

const mapStateToProps = state => {
    return {
        channels: state.channel.channels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadList: () => dispatch(actions.fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);