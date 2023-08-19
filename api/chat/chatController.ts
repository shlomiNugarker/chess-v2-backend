import chatService from './chatService'
import { Request, RequestHandler, Response } from 'express'

export default {
  getChatById,
  addChat,
  updateChat,
}

// READ
async function getChatById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const chat = await chatService.getById(id)
    res.json(chat)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'Failed to get chat' })
  }
}

// // CREATE
async function addChat(req: Request, res: Response) {
  try {
    const chat = req.body
    const insertedId = await chatService.add(chat)
    res.json(insertedId)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'Failed to add chat' })
  }
}

// // UPDATE
async function updateChat(req: Request, res: Response) {
  try {
    const chat = req.body
    const updatedChat = await chatService.update(chat)
    res.json(updatedChat)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'Failed to update chat' })
  }
}
