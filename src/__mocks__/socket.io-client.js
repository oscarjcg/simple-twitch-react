const sockets = [];

function io(url) {
    const handlers = {};
    const socket = {
        url,
        connected: true,
        on(event, cb) {
            handlers[event] = cb;
            return socket;
        },
        disconnect() {
            socket.connected = false;
        },
        serverEmit(event, data) {
            if (handlers[event]) handlers[event](data);
        },
    };
    sockets.push(socket);
    return socket;
}

io.io = io;
io.lastSocket = () => sockets[sockets.length - 1];
io.resetSockets = () => { sockets.length = 0; };

module.exports = io;
