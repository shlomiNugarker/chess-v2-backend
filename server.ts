import express, { Express, Request, Response } from 'express'
import { json } from 'body-parser'
import expressSession from 'express-session'
import path from 'path'
import cors from 'cors'

import authRoutes from './api/auth/authRoutes'
import userRoutes from './api/user/userRoutes'
import gameRoutes from './api/game/gameRoutes'

import socketService from './services/socketService'

const app: Express = express()
const http = require('http').createServer(app)

const session = expressSession({
  secret: 'secret session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})

app.use(session)
app.use(json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/game', gameRoutes)

socketService.connectSockets(http, session)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3030
http.listen(PORT, () => {
  console.log(`⚡️Server is running on port: http://localhost:${PORT}`)
})
