import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import classes from './ChatClientSocket.module.css';


import { SOCKET_URL } from '../../../config';

export default function ChatClientSocket(props) {
    const [totalConnections, setTotalConnections,] = useState(0);

    useEffect(() => {
        const socket = socketIOClient(SOCKET_URL);

        socket.on("totalConnections", data => {
            setTotalConnections(data);
        });

        socket.on("newMessage", data => {
            props.updateComments();
        });

        return () => socket.disconnect();
    }, []);

    return (
        <p className={classes.Text}>
        People: {totalConnections}
        </p>
    );
}