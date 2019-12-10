import React from 'react';

import classes from './Game.module.css';
import ChannelList from '../ChannelList/ChannelList';
import NavTab from '../Navigation/NavTab/NavTab';
import { withRouter } from 'react-router-dom';


const game = (props) => {
    let tabs = [
        {link: "/directory/game/" + props.match.params.category, text: "Live Channels"},
        {link: "/directory/videos/all", text: "Videos"},
        {link: "/directory/clips", text: "Clips"}
    ];
  
    return (
    <div className={classes.Content} style={{height: props.height}}>
        <div className={classes.Header}>
            <img
                className={classes.Image}
                src={props.category.image}
                alt={props.category.name}
                width="150">
            </img>
            <h1 className={classes.Title}>{props.category.name}</h1>            
        </div>

        <NavTab tabs={tabs}></NavTab>
        <p className={classes.Title}>Search</p>
        <ChannelList channels={props.channels}></ChannelList>
    </div>
    );
};

export default withRouter(game);