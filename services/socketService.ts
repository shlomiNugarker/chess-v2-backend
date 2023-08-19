import { Socket } from 'socket.io'
import { Chat } from '../models/Chat'
import { GameState } from '../models/GameState'

let gIo: {
  on: (arg0: string, arg1: (socket: any) => void) => void
  to: (arg0: string) => {
    (): any
    new (): any
    emit: { (arg0: any, arg1: any): void; new (): any }
  }
  emit: (arg0: any, arg1: any) => void
  fetchSockets: () => any
} | null = null

let connectedUsers: string[] = []

function connectSockets(http: any, session: any) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
      pingTimeout: 60000,
    },
  })
  gIo &&
    gIo.on('connection', (socket) => {
      // console.log({ connectedUsers })

      socket.on('setUserSocket', async (userId: string) => {
        // console.log('setUserSocket', userId)
        socket.userId = userId
        if (!connectedUsers.includes(userId)) connectedUsers.push(userId)

        const sockets = await _getAllSockets()
        sockets.forEach((socket: Socket) => {
          socket.emit('set-connected-users', connectedUsers)
        })
      })

      // while user logout:
      socket.on('user-disconnect', async (userId: string) => {
        // console.log('user disconnected', userId)
        connectedUsers = connectedUsers.filter(
          (userId) => userId !== socket.userId
        )
        const sockets = await _getAllSockets()
        sockets.forEach((socket: Socket) => {
          socket.emit('set-connected-users', connectedUsers)
        })
      })

      // handle game state:
      socket.on('state-updated', async (state: GameState) => {
        const { players } = state
        if (!players) return

        emitToUser({
          type: 'update-state',
          data: state,
          userId: players.black,
        })

        emitToUser({
          type: 'update-state',
          data: state,
          userId: players.white,
        })
      })
      //
      socket.on('chat-updated', async (chat: Chat) => {
        emitToUser({
          type: 'update-chat',
          data: chat,
          userId: chat.userId,
        })

        emitToUser({
          type: 'update-chat',
          data: chat,
          userId: chat.userId2,
        })
      })

      socket.on('disconnect', async () => {
        // while user close the browser:
        connectedUsers = connectedUsers.filter(
          (userId) => userId !== socket.userId
        )
        const sockets = await _getAllSockets()
        sockets.forEach((socket: Socket) => {
          socket.emit('set-connected-users', connectedUsers)
        })
      })
    })
}

function emitTo({ type, data, label }: any) {
  if (!gIo) return
  if (label) gIo.to('watching:' + label).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }: any) {
  const socket = await _getUserSocket(userId)
  if (socket) socket.emit(type, data)
  else {
    console.log('User socket not found')
    // _printSockets()
  }
}

// Send to all sockets BUT not the current socket
async function broadcast({ type, data, room = null, userId }: any) {
  // console.log('BROADCASTING', JSON.stringify(arguments))
  const excludedSocket = await _getUserSocket(userId)
  if (!excludedSocket) {
    // _printSockets();
    return
  }

  if (room) {
    excludedSocket.broadcast.to(room).emit(type, data)
  } else {
    excludedSocket.broadcast.emit(type, data)
  }
}

async function _getUserSocket(userId: string) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s: any) => s.userId === userId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  if (!gIo) return
  const sockets = await gIo.fetchSockets()
  return sockets
}

async function _printSockets() {
  const sockets = await _getAllSockets()
  console.log(`Sockets: (count: ${sockets.length}):`)
  sockets.forEach(_printSocket)
}
function _printSocket(socket: any) {
  console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

export default {
  connectSockets,
  emitTo,
  emitToUser,
  broadcast,
}
