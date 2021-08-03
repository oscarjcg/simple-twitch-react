import React from 'react';

import classes from './Game.module.css';
import ChannelList from '../ChannelList/ChannelList';
import NavTab from '../Navigation/NavTab/NavTab';
import { withRouter } from 'react-router-dom';
import Filter from '../UI/Filter/Filter';
import Spinner from '../UI/Spinner/Spinner';
import Error from '../UI/Error/Error';

const game = (props) => {
    let tabs = [
        {link: "/directory/game/" + props.match.params.category, text: "Live Channels"},
        //{link: "/directory/game/" + props.match.params.category + "/videos/all", text: "Videos"}
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
        header = props.categoryError ? <Error></Error> : <Spinner></Spinner>;
    }

    return (
    <div className={classes.Content} style={{height: props.height}}>        
        {header}
        <NavTab tabs={tabs}></NavTab>
        <Filter search={props.search} searchButton={props.searchButton}></Filter>   
        <ChannelList 
            channels={props.channels}
            selectChannel={props.selectChannel}
            error={props.channelError}></ChannelList>
    </div>
    );
};

export default withRouter(game);