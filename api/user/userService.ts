const dbService = require('../../services/dbService')
const ObjectId = require('mongodb').ObjectId

export default {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)

    const collection = await dbService.getCollection('user')
    var users = await collection.find(criteria).toArray()

    users = users.map((user: any) => {
      delete user.password
      return user
    })
    return users
  } catch (err) {
    console.log('cannot find users', err)
    throw err
  }
}

async function getById(userId: string) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    console.log(`while finding user ${userId}`, err)
    throw err
  }
}
async function getByUsername(username: string) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    console.log(`while finding user ${username}`, err)

    throw err
  }
}

async function remove(userId: string) {
  try {
    const collection = await dbService.getCollection('user')
    await collection.deleteOne({ _id: ObjectId(userId) })
  } catch (err) {
    console.log(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user: any) {
  try {
    // peek only updatable fields!
    const userToSave = {
      ...user,
      _id: ObjectId(user._id),
    }
    const collection = await dbService.getCollection('user')
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    console.log(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user: any) {
  try {
    // peek only updatable fields!
    // const userToAdd = {
    //   username: user.username,
    //   password: user.password,
    //   fullname: user.fullname,
    // }
    const collection = await dbService.getCollection('user')
    await collection.insertOne(user)
    // await collection.insertOne(userToAdd)
    return user
  } catch (err) {
    console.log('cannot insert user', err)

    throw err
  }
}

function _buildCriteria(filterBy: any) {
  const criteria = {}

  // if (filterBy.txt) {
  //   const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
  //   criteria.$or = [
  //     {
  //       username: txtCriteria,
  //     },
  //     {
  //       fullname: txtCriteria,
  //     },
  //   ]
  // }

  // // filter by position - if exists

  // // if (filterBy.position) {
  // //   criteria.position = { $exists: true }
  // // }
  // if (filterBy.position) {
  //   criteria.$and = [
  //     { 'position.lat': { $exists: true } },
  //     { 'position.lng': { $exists: true } },
  //   ]
  // }

  return criteria
}
