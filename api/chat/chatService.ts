import bcrypt from 'bcrypt'
import userService from '../user/userService'
import dbService from '../../services/dbService'
import { Collection, ObjectId } from 'mongodb'
import utilService from '../../services/utilService'

export default {
  getById,
  add,
  update,
}

async function getById(chatId: string) {
  try {
    const collection = await dbService.getCollection('chat')
    const chat = collection.findOne({ _id: new ObjectId(chatId) })
    return chat
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function add(chat: any) {
  try {
    const chatToAdd = { ...chat }
    const collection = await dbService.getCollection('chat')
    await collection.insertOne(chatToAdd)
    return chatToAdd
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function update(chat: any) {
  try {
    var id = new ObjectId(chat._id)
    delete chat._id
    const collection: Collection = await dbService.getCollection('chat')
    await collection.updateOne({ _id: id }, { $set: { ...chat } })
    const savedChat = { ...chat, _id: id }
    return savedChat
  } catch (err) {
    console.log(err)
    throw err
  }
}

function _buildCriteria(filterBy: { userId?: string }) {
  const criteria: { userId?: string } = {}

  if ('userId' in filterBy) {
    criteria.userId = filterBy.userId
  }

  return criteria
}
