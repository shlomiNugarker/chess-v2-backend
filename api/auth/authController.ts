import authService from './authService'
import { Request, RequestHandler, Response } from 'express'

export default { login, signup, logout }

declare module 'express-session' {
  interface SessionData {
    user: any
  }
}

async function login(req: Request, res: Response) {
  const { username, password } = req.body
  try {
    const user = await authService.login(username, password)
    req.session.user = user
    res.json(user)
  } catch (err) {
    console.log('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req: Request, res: Response) {
  try {
    const { username, password, fullname } = req.body
    const account = await authService.signup(username, password, fullname)
    const user = await authService.login(username, password)
    req.session.user = user
    res.json(user)
  } catch (err) {
    console.log('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req: Request, res: Response) {
  try {
    req.session.destroy((err) => console.log(err)) // ?

    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}
