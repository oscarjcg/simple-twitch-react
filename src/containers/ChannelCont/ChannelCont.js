import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ChannelCont.module.css';
import Channel from '../../components/Channel/Channel';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/UI/Error/Error';

const RATIO_16_9 = [16, 9];
const RATIO_4_3 = [4, 3];

class ChannelCont extends Component {

    componentDidMount() {
        this.props.onLoadChannel(this.props.match.params.channel);
        this.props.onUpdatedComments(null);
        this.props.onLoadComments(this.props.match.params.channel);
    }

    calculateVideoHeight = (width, ratio) => {
        return width * ratio[1] / ratio[0];
    }

    selectChannelHandler = (id) => {
        this.props.history.push('/' + id);
    }

    headerChannelWidthHandler = (width) => {
        this.props.onUpdateHeaderChannelWidth(width);
    }

    addCommentHandler = (e) => {

        if (e.keyCode == 13) {// Enter
            // Add comment
            this.props.onAddComment(this.props.channel.id, e.target.value, "ReactApp");
            e.target.value = "";
        }
    }

    updateCommentsHandler = () => {
        this.props.onLoadComments(this.props.match.params.channel);
    }

     componentDidUpdate(prevProps) {
         if (prevProps.channel != null && (this.props.match.params.channel != this.props.channel.name)) {
            this.props.onLoadChannel(this.props.match.params.channel);
            this.props.onLoadComments(this.props.match.params.channel);
         }
      }


    render() {
        let height = window.innerHeight - this.props.headerHeight;

        let channel = null;
        if (this.props.channel) {
            channel = this.props.channel;
        };

        let currentState = this.props.channelError ? <Error></Error> : <Spinner></Spinner>;

        return (
            <div className={classes.Content} style={{height: height}}>
                {channel ?
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

const mapStateToProps = state => {
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

const mapDispatchToProps = dispatch => {
    return {
        onLoadChannel: (channelName) => dispatch(actions.fetchByNameChannel(channelName)),
        onLoadComments: (channelName) => dispatch(actions.fetchCommentsByName(channelName)),
        onAddComment: (channelId, comment, author) => dispatch(actions.addComment(channelId, comment, author)),
        onUpdateHeaderChannelWidth: (width) => dispatch(actions.updateHeaderChannelWidth(width)),
        onUpdatedComments: (update) => dispatch(actions.updateComments(update)) // Remove this
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCont);
