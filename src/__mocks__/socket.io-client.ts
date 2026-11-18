type Handler = (data?: unknown) => void;

export interface MockSocket {
    url: string;
    connected: boolean;
    on(event: string, cb: Handler): MockSocket;
    disconnect(): void;
    serverEmit(event: string, data?: unknown): void;
}

export interface MockIo {
    (url: string): MockSocket;
    io: MockIo;
    lastSocket(): MockSocket;
    resetSockets(): void;
}

const sockets: MockSocket[] = [];

const io = ((url: string) => {
    const handlers: Record<string, Handler> = {};
    const socket: MockSocket = {
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
}) as MockIo;

io.io = io;
io.lastSocket = () => sockets[sockets.length - 1];
io.resetSockets = () => { sockets.length = 0; };

module.exports = io;
