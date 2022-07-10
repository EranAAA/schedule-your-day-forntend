import { scheduleService } from '../../services/schedule.service.js'
import { utilService } from '../../services/util.service'

export function setSchedule(schedule) {
   return (dispatch) => {
      dispatch({ type: 'SET_SCHEDULE', schedule })
   }
}

export function loadSchedules(userId) {
   try {
      return async (dispatch) => {
         const schedules = await scheduleService.query(userId)
         console.log('Got Schedules')
         dispatch({ type: 'SET_SCHEDULES', schedules })
         return schedules
      }
   } catch (err) {
      console.log('cannot load schedules', err)
   }
}
    
export function addSchedule(schedule) {
   try {
      return async (dispatch) => {
         const savedSchedule = await scheduleService.save(schedule)
         console.log('Added Schedule')
         dispatch({ type: 'ADD_SCHEDULE', schedule: savedSchedule })
         return savedSchedule
      }
   } catch (err) {
      console.log('cannot add schedule', err)
   }
}

export function updateSchedule(scheduleToSave) {
   try {
      return async (dispatch) => {
         const savedSchedule = await scheduleService.save(scheduleToSave)
         dispatch({ type: 'UPDATE_SCHEDULE', schedule: savedSchedule })
         return savedSchedule
      }
   } catch (err) {
      console.log('cannot edit schedule', err)
   }
}

export function filtering(filterBy) {
   return async (dispatch) => {
      try {
         const schedules = await scheduleService.query(filterBy)
         dispatch({ type: 'SET_SCHEDULES', schedules })
         dispatch({ type: 'FILTER_SCHEDULE', filterBy })
      } catch (err) {
         console.log('cannot filter schedules', err)
      }
   }
}

export function removeSchedule(scheduleId) {
   return async (dispatch) => {
      try {
         await scheduleService.remove(scheduleId)
         dispatch({ type: 'REMOVE_SCHEDULE', scheduleId })
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