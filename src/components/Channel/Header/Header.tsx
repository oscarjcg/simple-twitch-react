import React from 'react';
import withRouter, { RouterProps } from '../../../shared/withRouter';

import classes from './Header.module.css';
import ChannelDetail from './ChannelDetail/ChannelDetail';
import NavTab from '../../Navigation/NavTab/NavTab';
import type { Channel, NavItemData } from '../../../types';

interface HeaderProps extends RouterProps {
    channel: Channel;
    selectChannel: (name: string) => void;
}

const header = (props: HeaderProps) => {
    let navItems: NavItemData[] = [
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
