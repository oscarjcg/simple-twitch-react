import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import classes from './ChannelCont.module.css';
import Channel from '../../components/Channel/Channel';
import * as actions from '../../store/actions/index';
import withRouter, { RouterProps } from '../../shared/withRouter';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/UI/Error/Error';
import type { AppDispatch, RootState } from '../../store';

const RATIO_16_9: [number, number] = [16, 9];

const mapStateToProps = (state: RootState) => {
    return {
        headerHeight: state.userInterface.headerHeight,
        channels: state.channel.channels,
        channel: state.channel.channel,
        channelError: state.channel.error,
        headerChannelWidth: state.userInterface.headerChannelWidth,
        comments: state.comment.comments,
        updateComments: state.comment.updateComments // Remove this
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onLoadChannel: (channelName: string) => dispatch(actions.fetchByNameChannel(channelName)),
        onLoadComments: (channelName: string) => dispatch(actions.fetchCommentsByName(channelName)),
        onAddComment: (channelId: number, comment: string, author: string) => dispatch(actions.addComment(channelId, comment, author)),
        onUpdateHeaderChannelWidth: (width: number) => dispatch(actions.updateHeaderChannelWidth(width)),
        onUpdatedComments: (update: boolean | null) => dispatch(actions.updateComments(update)) // Remove this
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ChannelContProps = ConnectedProps<typeof connector> & RouterProps;

class ChannelCont extends Component<ChannelContProps> {

    componentDidMount() {
        this.props.onLoadChannel(this.props.match.params.channel);
        this.props.onUpdatedComments(null);
        this.props.onLoadComments(this.props.match.params.channel);
    }

    calculateVideoHeight = (width: number, ratio: [number, number]) => {
        return width * ratio[1] / ratio[0];
    }

    selectChannelHandler = (id: string) => {
        this.props.history.push('/' + id);
    }

    headerChannelWidthHandler = (width: number) => {
        this.props.onUpdateHeaderChannelWidth(width);
    }

    addCommentHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.keyCode === 13 && this.props.channel) {// Enter
            // Add comment
            const input = e.target as HTMLInputElement;
            this.props.onAddComment(this.props.channel.id, input.value, "ReactApp");
            input.value = "";
        }
    }

    updateCommentsHandler = () => {
        this.props.onLoadComments(this.props.match.params.channel);
    }

     componentDidUpdate(prevProps: ChannelContProps) {
         if (prevProps.channel != null && (this.props.match.params.channel !== this.props.channel?.name)) {
            this.props.onLoadChannel(this.props.match.params.channel);
            this.props.onLoadComments(this.props.match.params.channel);
         }
      }


    render() {
        let height = window.innerHeight - (this.props.headerHeight ?? 0);

        let currentState = this.props.channelError ? <Error></Error> : <Spinner></Spinner>;

        return (
            <div className={classes.Content} style={{height: height}}>
                {this.props.channel ?
                    <Channel
                        channel={this.props.channel}
                        videoWidth={this.props.headerChannelWidth
                            ? this.props.headerChannelWidth : '600'}
                        videoHeight={this.props.headerChannelWidth
                            ? this.calculateVideoHeight(this.props.headerChannelWidth, RATIO_16_9) : '337'}
                        selectChannel={this.selectChannelHandler}
                        headerChannelWidth={this.headerChannelWidthHandler}
                        comments={this.props.comments}
                        addComment={this.addCommentHandler}
                        updateComments={this.updateCommentsHandler}></Channel>
                    : currentState}


            </div>
        );
    }
}

export default withRouter(connector(ChannelCont));
