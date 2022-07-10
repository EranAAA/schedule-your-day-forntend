import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import { BasicSelect } from '../cmps/mui-templats/select'

import { BsInfoLg } from 'react-icons/bs'
import { SiOneplus } from 'react-icons/si'
import { IoIosNotifications, IoIosNotificationsOff } from 'react-icons/io'

export const ScheduleFilter = ({ schedules, toggleBoard, addNewSchedule }) => {

   const navigate = useNavigate();
   const { scheduleId } = useParams();
   const [currentSchedule, setCurrentSchedule] = useState('')

   useEffect(() => {
      setCurrentSchedule(schedules.find(schedule => schedule._id === scheduleId))
   }, [schedules])

   const onScheduleNotification = async () => {
      navigate('./notification')
   }

   const displayDate = () => {
      const event = new Date(Date.now());
      const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('en-GB', options)
   }

   const onAddSchedule = (ev) => {
      ev.preventDefault();
      addNewSchedule()
   }

   const onOpenScheduleDeatils = () => {
      navigate('./details')
   }

   return (
      <main className='schedule-filter'>
         <div className="board-container">
            <BasicSelect className="board" schedules={schedules} toggleBoard={toggleBoard} currentSchedule={currentSchedule} />
            <div className="add-schedule" onClick={onAddSchedule} ><SiOneplus /></div>
            <div className="details" onClick={onOpenScheduleDeatils} ><BsInfoLg /></div>
            <div className="notification" onClick={onScheduleNotification} ><IoIosNotifications /></div>
         </div>

         <div className="date">{displayDate()}</div>
      </main>
   )
}