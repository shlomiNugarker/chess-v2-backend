import { ObjectId } from 'mongodb'
import dbService from '../../services/dbService'

export default {
  getById,
}

async function getById(gameId: string) {
  try {
    const collection = await dbService.getCollection('game')
    const game = collection.findOne({ _id: new ObjectId(gameId) })
    return game
  } catch (err) {
    console.log(`cant finding game getById ${gameId}`, err)
    throw err
  }
}
