import { httpService } from './http.service'

export const notificationService = {
   query,
   getById,
   save,
   remove,
}

async function query(userId = {}) {
   try {
      return await httpService.get('notification/', { userId })
   } catch (err) {
      console.log('cant get notifications!')
      throw err
   }
}

async function getById(notificationId) {
   try {
      return await httpService.get(`notification/${notificationId}`)
   } catch (err) {
      console.log('cant get notification by id!')
      throw err
   }
}

async function remove(notificationId) {
   try {
      return await httpService.delete(`notification/${notificationId}`)
   } catch (err) {
      console.log('cant delete notification')
      throw err
   }
}

async function save(notification) {
   try {
      if (notification._id) {
         return await httpService.put(`notification/${notification._id}`, notification)
      } else {
         return await httpService.post(`notification/`, notification)
      }
   } catch (err) {
      console.log('cant save notification')
      throw err
   }
}
