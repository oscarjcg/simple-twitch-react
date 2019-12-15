import React from 'react';

import classes from './Channel.module.css';
import Header from './Header/Header';

const channel = (props) => (
    <div>
        <Header
            channel={props.channel}
            selectChannel={props.selectChannel}></Header>
    </div>
);

export default channel;