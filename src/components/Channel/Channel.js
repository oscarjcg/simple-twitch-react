import React, { Component }from 'react';

import classes from './Channel.module.css';
import Header from './Header/Header';
import YouTube from 'react-youtube';
import Chat from './Chat/Chat';

class Channel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myInterval: null,
            player: null,
            intervalInicialMS: 100,
            intervalCurrentMS: 0,
            video: "LembwKDo1Dk",
            header: React.createRef()
        }
    }   

    onReady = (event) => {             
        this.setState({player: event.target});

        let myInterval = setInterval(() => {
            if(this.state.player)
                this.setState({intervalCurrentMS: this.state.player.getCurrentTime()});
            
          }, this.state.intervalInicialMS);
        this.setState({myInterval: myInterval});
    }
 
    onStateChange = (event) => {
        // access to player in all event handlers via event.target
        // console.log(event);
    }

    componentDidMount() {
        this.props.headerChannelWidth(this.state.header.current.clientWidth);
        // console.log(this.state.header.current.clientWidth);
    }

    componentWillUnmount() {
        clearInterval(this.state.myInterval)
    }

    

    render() {
        const opts = {
            height: this.props.videoHeight,
            width: this.props.videoWidth,
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        return (
            <div className={classes.Main}>
                <div className={classes.Content} ref={this.state.header}>
                    <Header
                        channel={this.props.channel}
                        selectChannel={this.props.selectChannel}></Header>
                    <YouTube
                        videoId={this.state.video}
                        opts={opts}
                        onReady={this.onReady}
                        onStateChange={this.onStateChange}
                    />
                    {this.state.player ? <p className={classes.Info}>{this.state.intervalCurrentMS}</p> : null}
                </div>
                
                <Chat></Chat>
                
            </div>
        );
    }    
};

export default Channel;