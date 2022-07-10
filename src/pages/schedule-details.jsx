import React, { useState } from 'react'
import { useOutletContext, useNavigate, } from "react-router-dom"

import { ListDialog } from '../cmps/mui-templats/list-dialog'

export const ScheduleDetails = () => {

   const { schedule, schedules, saveSchedule, deleteSchedule } = useOutletContext()
   const [scheduleUpdate, setScheduleUpdate] = useState(schedule)
   const navigate = useNavigate();

   const onClose = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      navigate(-1)
   }

   const dateTemplate = () => {
      const event = new Date(Date(schedule.createdAt));
      const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('en-GB', options)
   }

   const handleChange = (ev) => {
      ev.preventDefault();
      if (ev.target.value === scheduleUpdate.title) return
      setScheduleUpdate({ ...scheduleUpdate, title: ev.target.value })
   }

   const onUpdateTaskOnBlur = (ev) => {
      ev.preventDefault();
      ev.target.blur();
      saveSchedule(scheduleUpdate)
   }

   const onUpdateTaskOnEnter = (ev) => {
      if (ev.key === 'Enter') {
         ev.target.blur();
         saveSchedule(scheduleUpdate)
      }
   }

   const onRemoveSchedule = (scheduleId) => {
      if (!schedule) return 
      deleteSchedule(scheduleId)
   }

   if (!schedule) return

   return (
      <main className='schedule-details' >
         <div className="details-contianer" >
            <button className="close-btn" onClick={onClose}>X</button>

            <div className="description-container">
               <textarea className='description' onChange={handleChange} onKeyDown={onUpdateTaskOnEnter} onBlur={onUpdateTaskOnBlur} value={scheduleUpdate.title}></textarea>
            </div>

            <div className="schedule-container">
               <p >Created at </p>
               <div className="schedule">{dateTemplate()}</div>
            </div>

            <div className="instructions-container">
               <div className="main-title">Instructions</div>

               <div className="title">Add new schedule</div>
               <div className="main">On empty cell Double Click and drag</div>
               <br />
               <div className="title">Add new board schedule</div>
               {/* <div className="main">On empyy cell Double Click and drag</div> */}
               <br />
               <div className="title">Edit / Remove schedule </div>
               {/* <div className="main">On empyy cell Double Click and drag</div> */}
               <br />
               <div className="title">Notifications </div>
               {/* <div className="main">On empyy cell Double Click and drag</div> */}
               <br />
               <div className="title">Edit schedule time </div>
               {/* <div className="main">On empyy cell Double Click and drag</div> */}

            </div>

            <div className="remove-container">
               <ListDialog schedules={schedules} schedule={schedule} onRemoveSchedule={onRemoveSchedule}/>
            </div>
         </div>

      </main>
   )
}
