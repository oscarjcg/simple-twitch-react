import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as actions from '../../store/actions/index';
import SimpleChannelList from '../../components/SimpleChannelList/SimpleChannelList';
import withRouter, { RouterProps } from '../../shared/withRouter';
import type { AppDispatch, RootState } from '../../store';

const mapStateToProps = (state: RootState) => {
    return {
        channels: state.channel.channels,
        channelError: state.channel.error,
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onLoadChannels: () => dispatch(actions.fetchChannels()),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type SimpleChannelListContProps = ConnectedProps<typeof connector> & RouterProps;

class SimpleChannelListCont extends Component<SimpleChannelListContProps> {
    componentDidMount() {
        this.props.onLoadChannels();

    }

    selectChannelHandler = (id: string) => {
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

export default withRouter(connector(SimpleChannelListCont));
