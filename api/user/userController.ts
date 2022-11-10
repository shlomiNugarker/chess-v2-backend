import userService from './userService'
import { Request, Response } from 'express'

export default {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUser,
}

async function getUser(req: Request, res: Response) {
  try {
    const user = await userService.getById(req.params.id)
    res.send(user)
  } catch (err) {
    console.log('Failed to get user', err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const filterBy = req.query
    const users = await userService.query(filterBy)
    res.send(users)
  } catch (err) {
    console.log('Failed to get users', err)
    res.status(500).send({ err: 'Failed to get users' })
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    await userService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    console.log('Failed to delete user', err)
    res.status(500).send({ err: 'Failed to delete user' })
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const user = req.body
    const savedUser = await userService.update(user)
    res.send(savedUser)
  } catch (err) {
    console.log('Failed to update user', err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}

async function addUser(req: Request, res: Response) {
  try {
    const user = req.body
    const savedUser = await userService.add(user)
    res.send(savedUser)
  } catch (err) {
    console.log('Failed to update user', err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}
