import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Header.module.css';
import ChannelDetail from './ChannelDetail/ChannelDetail';
import NavTab from '../../Navigation/NavTab/NavTab';

const header = (props) => {
    let navItems = [
        {link: "/" + props.match.params.channel, text: "Home", exact: true},
        //{link: "/#" + props.match.params.channel, text: "Videos", exact: true},
        //{link: "/##" + props.match.params.channel, text: "Clips", exact: true}
    ]; 
    return (
        <div className={classes.Content}>
            <ChannelDetail
                image={props.channel.image}
                name={props.channel.name}
                selectChannel={props.selectChannel}></ChannelDetail>
            <NavTab tabs={navItems}></NavTab>
        </div>
    )    
};

export default withRouter(header);