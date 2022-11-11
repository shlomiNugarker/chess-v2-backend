import { ObjectId } from 'mongodb'
import { GameState } from '../../models/GameState'
import dbService from '../../services/dbService'

export default {
  getById,
  add,
  update,
}

async function getById(stateId: string) {
  try {
    const collection = await dbService.getCollection('game')
    const state = collection.findOne({ _id: new ObjectId(stateId) })
    return state
  } catch (err) {
    console.log(`cant finding game getById ${stateId}`, err)
    throw err
  }
}

async function add(state: GameState) {
  try {
    const stateToAdd = { ...state, createdAt: new Date().getTime() }
    const collection = await dbService.getCollection('game')
    await collection.insertOne(stateToAdd)
    return stateToAdd
  } catch (err) {
    console.log(`cant add state `, err)
    throw err
  }
}

async function update(state: GameState) {
  try {
    var id = new ObjectId(state._id)
    delete state._id
    const collection = await dbService.getCollection('game')
    await collection.updateOne({ _id: id }, { $set: { ...state } })
    const addedState = { ...state, _id: id }
    return addedState
  } catch (err) {
    console.log(`cannot update post ${state._id}`, err)
    throw err
  }
}
