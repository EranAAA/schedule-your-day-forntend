import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { scheduleReducer } from './schedule/schedule.reducer.js'
import { notificationReducer } from './notification/notification.reducer.js'
import { userReducer } from './user/user.reducer.js'

const rootReducer = combineReducers({
   scheduleModule: scheduleReducer,
   notificationModule: notificationReducer, 
   userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

