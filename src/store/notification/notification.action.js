import { notificationService } from '../../services/notification.service.js'
import { utilService } from '../../services/util.service'

export function setNotification(notification) {
   return (dispatch) => {
      dispatch({ type: 'SET_NOTIFICATION', notification })
   }
}

export function loadNotifications(userId) {
   try {
      return async (dispatch) => {
         const notifications = await notificationService.query(userId)
         console.log('Got Notifications')
         dispatch({ type: 'SET_NOTIFICATIONS', notifications })
         return notifications
      }
   } catch (err) {
      console.log('cannot load notifications', err)
   }
}
    
export function addNotification(notification) {
   try {
      return async (dispatch) => {
         const savedNotification = await notificationService.save(notification)
         console.log('Added Notification')
         dispatch({ type: 'ADD_NOTIFICATION', notification: savedNotification })
         return savedNotification
      }
   } catch (err) {
      console.log('cannot add notification', err)
   }
}

export function updateNotification(notificationToSave) {
   try {
      return async (dispatch) => {
         const savedNotification = await notificationService.save(notificationToSave)
         dispatch({ type: 'UPDATE_NOTIFICATION', notification: savedNotification })
         return savedNotification
      }
   } catch (err) {
      console.log('cannot edit notification', err)
   }
}

export function filtering(filterBy) {
   return async (dispatch) => {
      try {
         const notifications = await notificationService.query(filterBy)
         dispatch({ type: 'SET_NOTIFICATIONS', notifications })
         dispatch({ type: 'FILTER_NOTIFICATION', filterBy })
      } catch (err) {
         console.log('cannot filter notifications', err)
      }
   }
}

export function removeNotification(notificationId) {
   return async (dispatch) => {
      try {
         await notificationService.remove(notificationId)
         dispatch({ type: 'REMOVE_NOTIFICATION', notificationId })
         console.log('Deleted Succesfully!')
      } catch (err) {
         console.error('Error:', err)
      }
   }
}

export function setFilterBy(filterBy) {
   return (dispatch) => {
      dispatch({ type: 'SET_FILTER_BY', filterBy })
   }
}

export function setTemplate() {
   return async (dispatch) => {
      try {
         const template = await utilService.getTemplate()
         dispatch({ type: 'SET_TEMPLATE', template })
         console.log('Set Grids Succesfully!')
      } catch (err) {
         console.error('Error:', err)
      }
   }
}