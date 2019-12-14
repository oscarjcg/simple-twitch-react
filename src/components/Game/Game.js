import React from 'react';

import classes from './Game.module.css';
import ChannelList from '../ChannelList/ChannelList';
import NavTab from '../Navigation/NavTab/NavTab';
import { withRouter } from 'react-router-dom';
import Filter from '../UI/Filter/Filter';
import Spinner from '../UI/Spinner/Spinner';

const game = (props) => {
    let tabs = [
        {link: "/directory/game/" + props.match.params.category, text: "Live Channels"},
        {link: "/directory/videos/all", text: "Videos"},
        {link: "/directory/clips", text: "Clips"} 
    ];
  
    let header = null;
    if (props.category) {
        header = 
            <div className={classes.Header}>
            <img
                className={classes.Image}
                src={props.category.image}
                alt={props.category.name}
                width="150">
            </img>
            <h1 className={classes.Title}>{props.category.name}</h1>            
        </div>
        ;
    }
    else {
        header = <Spinner></Spinner>;
    }

    return (
    <div className={classes.Content} style={{height: props.height}}>        
        {header}
        <NavTab tabs={tabs}></NavTab>
        <Filter></Filter>   
        <ChannelList 
            channels={props.channels}
            selectChannel={props.selectChannel}></ChannelList>
    </div>
    );
};

export default withRouter(game);