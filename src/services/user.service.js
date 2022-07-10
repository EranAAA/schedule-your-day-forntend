import { httpService } from './http.service'
import { store } from '../store/store'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
   login,
   logout,
   signup,
   getLoggedinUser,
   saveLocalUser,
   getUsers,
   getById,
   remove,
   update,
   changeScore
}

async function getUsers() {
   return await httpService.get(`user`)
}

async function getById(userId) {
   const user = await httpService.get(`user/${userId}`)
   return user
}

async function remove(userId) {
   return await httpService.delete(`user/${userId}`)
}

async function update(user) {
   user = await httpService.put(`user/${user._id}`, user)
   if (getLoggedinUser()._id === user._id) saveLocalUser(user)
   return user
}

async function login(userCred) {
   try {
      const user = await httpService.post('auth/login', userCred)
      return saveLocalUser(user)
   } catch (err) {
      throw err
   }
}

async function signup(userCred) {
   const user = await httpService.post('auth/signup', userCred)
   return saveLocalUser(user)
}

async function logout() {
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function changeScore(by) {
   const user = getLoggedinUser()
   if (!user) throw new Error('Not loggedin')
   user.score = user.score + by || by
   await update(user)
   return user.score
}

function saveLocalUser(user) {
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
   return user
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}