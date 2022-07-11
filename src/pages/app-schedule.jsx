import React, { useState, useEffect, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Outlet, useNavigate } from 'react-router-dom'

import { scheduleService } from '../services/schedule.service'
import { setSchedule, loadSchedules, updateSchedule, setTemplate, addSchedule, removeSchedule } from '../store/schedule/schedule.action'
import { onLogout } from '../store/user/user.action'

import { ScheduleHeader } from '../cmps/schedule-header'
import { ScheduleFilter } from '../cmps/schedule-filter'
import { ScheduleList } from '../cmps/schedule-list'

export const Context = createContext()

export const AppSchedule = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate();

   const [schedules, setSchedules] = useState([])
   const { scheduleId } = useParams();
   const schedule = useSelector(({ scheduleModule }) => scheduleModule.schedule)
   const user = useSelector(({ userModule }) => userModule.user)

   useEffect(() => {
      loadData()
   }, [])

   const loadData = async () => {
      if (scheduleId === 'new') {
         addNewSchedule()
      } else {
         const schedulesFromDb = await dispatch(loadSchedules(user._id))
         setSchedules(schedulesFromDb)
         navigate(`/schedule/${schedulesFromDb[0]._id}`)
      }
      await dispatch(setTemplate())
   }

   const addNewSchedule = async () => {
      const newSchedule = scheduleService.getEmptySchedule()
      newSchedule.createdBy._id = user._id
      newSchedule.createdBy.fullname = user.fullname
      newSchedule.createdBy.email = user.email
      
      const newScheduleCreated = await dispatch(addSchedule(newSchedule))
      setSchedules([...schedules, newScheduleCreated])
      navigate(`/schedule/${newScheduleCreated._id}`)
   }

   const addNewTask = async (date) => {
      const scheduleIdx = schedules.findIndex(schedule => schedule._id === scheduleId)
      const saveSchedule = schedules[scheduleIdx]
      const saveTasks = saveSchedule.tasks

      const newTask = scheduleService.getEmptyTask()
      newTask.date = date

      saveTasks.push(newTask)
      saveSchedule.tasks = saveTasks

      await dispatch(updateSchedule(saveSchedule))
   }

   const updateTask = async (task) => {
      const scheduleIdx = schedules.findIndex(schedule => schedule._id === scheduleId)
      const saveSchedule = schedules[scheduleIdx]
      const saveTasks = saveSchedule.tasks
      const taskIdx = saveTasks.findIndex(updatedTask => updatedTask.id === task.id)

      saveTasks[taskIdx] = task
      saveSchedule.tasks = saveTasks

      const savedSchedules = schedules.map( schedule => schedule._id === saveSchedule._id ? saveSchedule : schedule)
      setSchedules(savedSchedules)
      await dispatch(updateSchedule(saveSchedule))
   }

   const saveSchedule = async (schedule) => {
      await dispatch(updateSchedule(schedule))
   }

   const deleteSchedule = async (scheduleId) => {
      if (schedules.length === 1) {
         const updatingSchedules = [...schedules]
         updatingSchedules.tasks = []
         updatingSchedules.title = ''
         updatingSchedules.createdAt = Date.now()
         await dispatch(updateSchedule(updatingSchedules))
      } else {
         const updatedSchedules = schedules.filter(schedule => schedule._id !== scheduleId)
         navigate(`/schedule/${updatedSchedules[updatedSchedules.length - 1]._id}`)
         await dispatch(removeSchedule(scheduleId))
         setSchedules([...updatedSchedules])
      }
   }

   const removeTask = async (taskId) => {
      const scheduleIdx = schedules.findIndex(schedule => schedule._id === scheduleId)
      const saveSchedule = schedules[scheduleIdx]
      const saveTasks = saveSchedule.tasks
      const taskIdx = saveTasks.findIndex(updatedTask => updatedTask.id === taskId)

      saveTasks.splice(taskIdx, 1)
      saveSchedule.tasks = saveTasks

      await dispatch(updateSchedule(saveSchedule))
   }

   const clearTeamplate = async () => {
      await dispatch(setTemplate())
   }

   const logOut = async () => {
      await dispatch(onLogout())
   }

   const toggleBoard = (schedule) => {
      dispatch(setSchedule(schedule))
      navigate(`/schedule/${schedule._id}`)
   }

   if (!schedule) return

   return (
      <main className='app-schedule'>
         <Context.Provider value={{ addNewTask, updateTask, clearTeamplate }}>
            <ScheduleHeader logOut={logOut} user={user} />
            <ScheduleFilter schedules={schedules} toggleBoard={toggleBoard} addNewSchedule={addNewSchedule} />
            <ScheduleList schedule={schedule} />
         </Context.Provider>
         <Outlet context={{ schedules, schedule, saveSchedule, removeTask, updateTask, deleteSchedule }} />
      </main>
   )
}