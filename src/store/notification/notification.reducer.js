const initialState = {
   notifications: [],
}
export function notificationReducer(state = initialState, action) {
   var newState = state
   var notifications
   var notification

   switch (action.type) {
      case 'SET_NOTIFICATIONS':
         newState = { ...state, notifications: action.notifications }
         break
      case 'REMOVE_NOTIFICATION':
         notifications = state.notifications.filter(notification => notification._id !== action.notificationId)
         newState = { ...state, notifications }
         break
      case 'ADD_NOTIFICATION':
         notification = {...action.notification}
         newState = { ...state, notifications: [...state.notifications, action.notification] }
         break
      case 'UPDATE_NOTIFICATION':
         notifications = state.notifications.map(notification => (notification._id === action.notification._id) ? action.notification : notification)
         newState = { ...state, notifications }
         break
      case 'CLEAR_NOTIFICATION':
         newState = { ...state, notification: [] }
         break
      default:
   }

   window.notificationState = newState
   return newState

}
