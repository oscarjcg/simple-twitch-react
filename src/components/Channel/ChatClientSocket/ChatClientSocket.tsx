import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import classes from './ChatClientSocket.module.css';


import { SOCKET_URL } from '../../../config';

interface ChatClientSocketProps {
    updateComments: () => void;
}

export default function ChatClientSocket(props: ChatClientSocketProps) {
    const { updateComments } = props;
    const [totalConnections, setTotalConnections,] = useState(0);

    useEffect(() => {
        const socket = socketIOClient(SOCKET_URL);

        socket.on("totalConnections", (data: number) => {
            setTotalConnections(data);
        });

        socket.on("newMessage", () => {
            updateComments();
        });

        return () => { socket.disconnect(); };
    }, [updateComments]);

    return (
        <p className={classes.Text}>
        People: {totalConnections}
        </p>
    );
}
