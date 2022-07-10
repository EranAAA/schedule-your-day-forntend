import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { GoNote } from 'react-icons/go'
import { FaExclamation } from 'react-icons/fa'

import { utilService } from '../services/util.service'
import { Context } from '../pages/app-schedule'

export const TaskPreview = ({ task }) => {

   const { updateTask } = useContext(Context);
   const navigate = useNavigate()

   const [updatedTask, setUpdatedTask] = useState(task)
   const [isOverTask, setIsOverTask] = useState(false)
   const [title, setTitle] = useState(task.title)

   const handleChange = ({ target }) => {
      setTitle(target.value)
      setUpdatedTask({ ...updatedTask, title: target.value })
   }

   const onUpdateTask = (ev) => {
      if (ev.keyCode === 13 && ev.shiftKey === false) {
         ev.preventDefault();
         ev.target.blur();
         updateTask(updatedTask)
      }
   }

   const onUpdateTaskBlur = (ev) => {
      ev.preventDefault();
      ev.target.blur();
      updateTask(updatedTask)
   }

   const onToggleBtnDetails = (ev) => {
      ev.stopPropagation()
      if (ev.type === 'mouseover') setIsOverTask(true)
      else if (ev.type === 'mouseout') setIsOverTask(false)
   }

   const onMoveToDetails = (ev) => {
      ev.stopPropagation()
      navigate(`./${task.id}`)
   }

   const dateTemplate = () => {
      const { days, hours } = utilService.getTimeFormatted(task.date)
      let display = ''
      display = `${hours[0]} - ${hours[1]} `
      return display
   }

   const backgroundDisplay = () => {
      if (task.styles.stripStyle === 'strip-diagonal') {
         return {
            backgroundImage: '-webkit-repeating-linear-gradient(45deg, transparent,transparent 8px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 18px)',
            backgroundSize: 'unset'

         }
      } else if (task.styles.stripStyle === 'strip-horizental') {
         return {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, .6) 50%, transparent 50%, transparent)`,
            backgroundSize: '50px 16px'
         }
      } else {
         return {
            backgroundImage: `unset`,
            backgroundSize: 'unset'
         }
      }
   }

   return (
      <div className="task-container" onMouseOver={onToggleBtnDetails} onMouseOut={onToggleBtnDetails}
         style={{
            gridRow: `${task.date.hoursFrom}/${task.date.hoursTo}`,
            gridColumn: `${task.date.daysFrom}/${task.date.daysTo}`,
         }} >

         <textarea className='task-preview' onChange={handleChange} onBlur={onUpdateTaskBlur} onKeyDown={onUpdateTask} value={title}
            style={
               {
                  backgroundImage: `${backgroundDisplay().backgroundImage} `,
                  backgroundSize: `${backgroundDisplay().backgroundSize}`,
                  backgroundColor: `${task.styles.backgroundColor}`,
                  color: `${task.styles.color}`,
                  fontSize: `${task.styles.fontSize ? task.styles.fontSize : '13'}px`
               }}>
         </textarea>

         <div className="display-time">
            {isOverTask && dateTemplate()}
         </div>

         <div className="icons" style={
            { backgroundColor: `${task.styles.backgroundColor}` }}>
            <div className="info">
               {task.description && <div className='task-preview-desc' ><GoNote /></div>}
               {task?.isImportant && task.isImportant && <div className='task-preview-important' ><FaExclamation /></div>}
            </div>
            {isOverTask && <button className='task-preview-btn' onClick={onMoveToDetails}>Details</button>}

         </div>

      </div>
   )
}