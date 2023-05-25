import bcrypt from 'bcrypt'
import userService from '../user/userService'

export default {
  signup,
  login,
}

async function login(username: string, password: string) {
  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('Invalid username or password')
  // TODO: un-comment for real login
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid username or password')
  delete user.password
  return user
}

async function signup(username: string, password: string, fullname: string) {
  const saltRounds = 10

  if (!username || !password || !fullname)
    return Promise.reject('fullname, username and password are required!')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ username, password: hash, fullname })
}
