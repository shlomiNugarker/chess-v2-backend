"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let gIo = null;
let connectedUsers = [];
function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
            pingTimeout: 60000,
        },
    });
    gIo &&
        gIo.on('connection', (socket) => {
            // console.log({ connectedUsers })
            socket.on('setUserSocket', (userId) => __awaiter(this, void 0, void 0, function* () {
                // console.log('setUserSocket', userId)
                socket.userId = userId;
                if (!connectedUsers.includes(userId))
                    connectedUsers.push(userId);
                const sockets = yield _getAllSockets();
                sockets.forEach((socket) => {
                    socket.emit('set-connected-users', connectedUsers);
                });
            }));
            // while user logout:
            socket.on('user-disconnect', (userId) => __awaiter(this, void 0, void 0, function* () {
                // console.log('user disconnected', userId)
                connectedUsers = connectedUsers.filter((userId) => userId !== socket.userId);
                const sockets = yield _getAllSockets();
                sockets.forEach((socket) => {
                    socket.emit('set-connected-users', connectedUsers);
                });
            }));
            // handle game state:
            socket.on('state-updated', (state) => __awaiter(this, void 0, void 0, function* () {
                const { players } = state;
                if (!players)
                    return;
                emitToUser({
                    type: 'update-state',
                    data: state,
                    userId: players.black,
                });
                emitToUser({
                    type: 'update-state',
                    data: state,
                    userId: players.white,
                });
            }));
            //
            socket.on('chat-updated', (chat) => __awaiter(this, void 0, void 0, function* () {
                emitToUser({
                    type: 'update-chat',
                    data: chat,
                    userId: chat.userId,
                });
                emitToUser({
                    type: 'update-chat',
                    data: chat,
                    userId: chat.userId2,
                });
            }));
            socket.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
                // while user close the browser:
                connectedUsers = connectedUsers.filter((userId) => userId !== socket.userId);
                const sockets = yield _getAllSockets();
                sockets.forEach((socket) => {
                    socket.emit('set-connected-users', connectedUsers);
                });
            }));
        });
}
function emitTo({ type, data, label }) {
    if (!gIo)
        return;
    if (label)
        gIo.to('watching:' + label).emit(type, data);
    else
        gIo.emit(type, data);
}
function emitToUser({ type, data, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = yield _getUserSocket(userId);
        if (socket)
            socket.emit(type, data);
        else {
            console.log('User socket not found');
            // _printSockets()
        }
    });
}
// Send to all sockets BUT not the current socket
function broadcast({ type, data, room = null, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('BROADCASTING', JSON.stringify(arguments))
        const excludedSocket = yield _getUserSocket(userId);
        if (!excludedSocket) {
            // _printSockets();
            return;
        }
        if (room) {
            excludedSocket.broadcast.to(room).emit(type, data);
        }
        else {
            excludedSocket.broadcast.emit(type, data);
        }
    });
}
function _getUserSocket(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield _getAllSockets();
        const socket = sockets.find((s) => s.userId === userId);
        return socket;
    });
}
function _getAllSockets() {
    return __awaiter(this, void 0, void 0, function* () {
        // return all Socket instances
        if (!gIo)
            return;
        const sockets = yield gIo.fetchSockets();
        return sockets;
    });
}
function _printSockets() {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield _getAllSockets();
        console.log(`Sockets: (count: ${sockets.length}):`);
        sockets.forEach(_printSocket);
    });
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`);
}
exports.default = {
    connectSockets,
    emitTo,
    emitToUser,
    broadcast,
};
