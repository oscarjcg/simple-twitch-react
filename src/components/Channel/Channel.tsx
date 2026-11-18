import React, { Component }from 'react';

import classes from './Channel.module.css';
import Header from './Header/Header';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import Chat from './Chat/Chat';
import Viewer3DModel from './Viewer3DModel/Viewer3DModel';
import ChatClientSocket from "./ChatClientSocket/ChatClientSocket";
import type { Channel as ChannelData, Comment } from '../../types';

const TYPE_YOUTUBE = 1;
const TYPE_3D_MODEL = 2;

type YouTubePlayer = YouTubeEvent['target'];

interface ChannelProps {
    channel: ChannelData;
    videoWidth: number | string;
    videoHeight: number | string;
    selectChannel: (name: string) => void;
    headerChannelWidth: (width: number) => void;
    comments: Comment[] | null;
    addComment: React.KeyboardEventHandler<HTMLInputElement>;
    updateComments: () => void;
}

interface ChannelState {
    myInterval: ReturnType<typeof setInterval> | null;
    player: YouTubePlayer | null;
    intervalInicialMS: number;
    // The player API is asynchronous, so this holds the pending current time.
    intervalCurrentMS: number | ReturnType<YouTubePlayer['getCurrentTime']>;
    video: string;
    header: React.RefObject<HTMLDivElement | null>;
}

class Channel extends Component<ChannelProps, ChannelState> {

    constructor(props: ChannelProps) {
        super(props);
        this.state = {
            myInterval: null,
            player: null,
            intervalInicialMS: 100,
            intervalCurrentMS: 0,
            video: "LembwKDo1Dk",
            header: React.createRef<HTMLDivElement>()
        }
    }

    onReady = (event: YouTubeEvent) => {
        this.setState({player: event.target});

        let myInterval = setInterval(() => {
            if(this.state.player)
                this.setState({intervalCurrentMS: this.state.player.getCurrentTime()});

          }, this.state.intervalInicialMS);
        this.setState({myInterval: myInterval});
    }

    onStateChange = (event: YouTubeEvent<number>) => {
        // access to player in all event handlers via event.target
        // console.log(event);
    }

    componentDidMount() {
        this.props.headerChannelWidth(this.state.header.current!.clientWidth);
        // console.log(this.state.header.current.clientWidth);
    }

    componentWillUnmount() {
        clearInterval(this.state.myInterval ?? undefined)
    }

    render() {
        const opts: YouTubeProps['opts'] = {
            height: this.props.videoHeight,
            width: this.props.videoWidth,
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        // Content type
        let contentComponent = null;
        if (this.props.channel) {
            switch (this.props.channel.type) {
                case TYPE_YOUTUBE:
                    contentComponent =
                        <YouTube
                            //videoId={this.state.video}
                            videoId={this.props.channel.content}
                            opts={opts}
                            onReady={this.onReady}
                            onStateChange={this.onStateChange}
                        />;
                    break;
                case TYPE_3D_MODEL:
                    contentComponent =
                        <Viewer3DModel
                            model={this.props.channel.content}
                            height={this.props.videoHeight}
                            width={this.props.videoWidth}/>;
                    break;
                default:
                    break;
            }
        }

        // Render
        return (
            <div className={classes.Main}>
                <div className={classes.Content} ref={this.state.header}>
                    <Header
                        channel={this.props.channel}
                        selectChannel={this.props.selectChannel}></Header>
                    { contentComponent }

                    {/*this.state.player ? <p className={classes.Info}>{this.state.intervalCurrentMS}</p> : null */}
                    {this.props.channel ? <ChatClientSocket updateComments={this.props.updateComments}></ChatClientSocket> : null}

                </div>

                <Chat
                    comments={this.props.comments}
                    addComment={this.props.addComment}></Chat>

            </div>
        );
    }
}

export default Channel;
