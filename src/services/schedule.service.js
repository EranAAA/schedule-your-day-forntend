import { httpService } from './http.service'
import { utilService } from './util.service.js'

export const scheduleService = {
   query,
   getById,
   save,
   remove,
   getEmptySchedule,
   getEmptyTask
}

async function query(userId = {}) {
   try {
      return await httpService.get('schedule/', { userId })
   } catch (err) {
      console.log('cant get schedules!')
      throw err
   }
}

async function getById(scheduleId) {
   try {
      return await httpService.get(`schedule/${scheduleId}`)
   } catch (err) {
      console.log('cant get schedule by id!')
      throw err
   }
}

async function remove(scheduleId) {
   try {
      return await httpService.delete(`schedule/${scheduleId}`)
   } catch (err) {
      console.log('cant delete schedule')
      throw err
   }
}

async function save(schedule) {
   try {
      if (schedule._id) {
         return await httpService.put(`schedule/${schedule._id}`, schedule)
      } else {
         return await httpService.post(`schedule/`, schedule)
      }
   } catch (err) {
      console.log('cant save schedule')
      throw err
   }
}

function getEmptySchedule() {
   return {
      title: `My Schedule-${utilService.makeId(3)}`,
      createdAt: Date.now(),
      createdBy: {
         _id: '',
         fullname: '',
         email: '',
         imgURL: '',
      },
      tasks: []
   }
}

function getEmptyTask() {
   return {
      id: utilService.makeId(),
      date: {
         daysFrom: '',
         daysTo: '',
         hoursFrom: '',
         hoursTo: '',
      },
      styles: {
         backgroundColor: '#5BA4CF',
         color: 'black',
      },
      title: 'New task!',
      description: '',
      isImportant: false
   }

}