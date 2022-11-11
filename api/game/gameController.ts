import gameService from './gameService'
import { Request, RequestHandler, Response } from 'express'

export default { getGameById }

declare module 'express-session' {
  interface SessionData {
    user: any
  }
}

async function getGameById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const game = await gameService.getById(id)
    res.json(game)
  } catch (err) {
    console.log('Failed to getGameById ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}
