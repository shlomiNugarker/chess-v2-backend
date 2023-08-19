import gameService from './gameService'
import { Request, RequestHandler, Response } from 'express'

export default { getStateById, updateState, addState }

async function getStateById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const state = await gameService.getById(id)
    res.json(state)
  } catch (err) {
    console.log('Failed to getGameById ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function updateState(req: Request, res: Response) {
  try {
    const state = req.body
    const addedGame = await gameService.update(state)
    res.json(addedGame)
  } catch (err) {
    console.log('Failed to getGameById ' + err)
    res.status(401).send({ err: 'Failed to updateState' })
  }
}

async function addState(req: Request, res: Response) {
  try {
    const state = req.body
    const insertedId = await gameService.add(state)
    res.json(insertedId)
  } catch (err) {
    console.log('Failed to add state ' + err)
    res.status(401).send({ err: 'Failed to add state' })
  }
}
