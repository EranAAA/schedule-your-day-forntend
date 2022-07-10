const initialState = {
   schedules: [],
   schedule: {},
   template: {},

}
export function scheduleReducer(state = initialState, action) {
   var newState = state
   var schedules
   var schedule

   switch (action.type) {
      case 'SET_SCHEDULES':
         newState = { ...state, schedules: action.schedules, schedule: action.schedules[0] }
         break
      case 'SET_TASK':
         newState = { ...state, task: action.task }
         break
      case 'SET_SCHEDULE':
         newState = { ...state, schedule: action.schedule }
         break
      case 'REMOVE_SCHEDULE':
         schedules = state.schedules.filter(schedule => schedule._id !== action.scheduleId)
         newState = { ...state, schedules, schedule: schedules[0] }
         break
      case 'ADD_SCHEDULE':
         schedule = {...action.schedule}
         newState = { ...state, schedules: [...state.schedules, action.schedule], schedule: schedule }
         break
      case 'SAVE_SCHEDULE':
         newState = { ...state, schedule: action.schedule }
         break
      case 'UPDATE_SCHEDULE':
         schedules = state.schedules.map(schedule => (schedule._id === action.schedule._id) ? action.schedule : schedule)
         schedule = {...action.schedule}
         newState = { ...state, schedules, schedule: schedule }
         break
      case 'CLEAR_SCHEDULE':
         newState = { ...state, schedule: [] }
         break
      case 'SET_TEMPLATE':
         newState = { ...state, template: action.template }
         break
      default:
   }
   // For debug:
   window.scheduleState = newState
   return newState

}
