import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import classes from './ChatClientSocket.module.css';


const ENDPOINT = "http://localhost:3000";

export default function ChatClientSocket() {
    const [totalConnections, setTotalConnections] = useState(0);


    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on("test", data => {
            console.log("test");
        });

        socket.on("totalConnections", data => {
            console.log("totalConnections");
            console.log(data);
            setTotalConnections(data);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <p className={classes.Text}>
        People: {totalConnections}
        </p>
    );
}