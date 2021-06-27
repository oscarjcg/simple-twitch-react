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
        this.props.onLoadChannels();
        this.props.onLoadComments();
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
            this.props.onAddComment(e.target.value);
        }
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

        let comments = null;
        if (this.props.comments) {
            comments = this.props.comments;
        }

        let currentState = this.props.channelError ? <Error></Error> : <Spinner></Spinner>;

        return (
            <div className={classes.Content} style={{height: height}}>
                {channel ?
                    <Channel 
                        channel={channel}
                        videoWidth={this.props.headerChannelWidth 
                            ? this.props.headerChannelWidth : '600'}
                        videoHeight={this.props.headerChannelWidth 
                            ? this.calculateVideoHeight(this.props.headerChannelWidth, RATIO_16_9) : '337'}
                        selectChannel={this.selectChannelHandler}
                        headerChannelWidth={this.headerChannelWidthHandler}
                        comments={comments}
                        addComment={this.addCommentHandler}></Channel> 
                    : currentState}                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        headerHeight: state.userInterface.headerHeight,
        channels: state.channel.channels,
        channelError: state.channel.error,
        headerChannelWidth: state.userInterface.headerChannelWidth,
        comments: state.comment.comments
    };
};

const mapDispatchToProps = dispatch => {
    return {   
        onLoadChannels: () => dispatch(actions.fetchChannels()),
        onLoadComments: () => dispatch(actions.fetchComments()),
        onAddComment: (comment) => dispatch(actions.addComment(comment)),
        onUpdateHeaderChannelWidth: (width) => dispatch(actions.updateHeaderChannelWidth(width))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCont);