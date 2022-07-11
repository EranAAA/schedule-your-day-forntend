import React, { useRef, useContext, useEffect, useState } from 'react'

import { Context } from '../pages/app-schedule'
import { utilService } from '../services/util.service'
import { TaskPreview } from './task-preview'
import { TaskGridTemplate } from './task-grid-template'
import { SchedulePreviewHour } from './schedule-preview-hour'

export const TaskList = ({ tasks, template, hours }) => {

   const { addNewTask, clearTeamplate } = useContext(Context);
   const elementRef = useRef();
   const grids = useRef([]);
   const [earlierTaskHour, setEarlierTaskHour] = useState('')

   useEffect(() => {
      setEarlierTaskHour(utilService.getEarlierTaskHour(tasks))
   }, [tasks])

   const startNewSchedule = ({ target, detail }) => {
      if (detail === 2) {
         elementRef.current.addEventListener("mouseover", changeBackgroung)
         if (target.className === 'task-grid-template') {
            target.classList.add('select-cell')
            grids.current.push(target.style.gridArea.substring(0, 6))
         }
      }
   }

   const endNewSchedule = () => {
      elementRef.current.removeEventListener("mouseover", changeBackgroung)
   }

   const changeBackgroung = ({ target }) => {
      if (target.className === 'task-grid-template') {
         target.classList.add('select-cell')
         grids.current.push(target.style.gridArea.substring(0, 6))
      }
   }

   const onEndMouseEvent = ({ target }) => {

      if (target.className !== 'task-grid-template select-cell') return
      if (!grids.current.length) return

      const classSelectCell = document.querySelectorAll('.select-cell')
      classSelectCell.forEach(elm => elm.classList.remove('select-cell'))

      elementRef.current.removeEventListener("mouseover", changeBackgroung)
      const tasksGrid = utilService.getFormattedLocation(grids.current)
      target.style.cursor = 'pointer'

      clearTeamplate()
      addNewTask(tasksGrid)
      grids.current = []
   }

   if (!tasks) return
   if (!template) return

   
   return (
      <ul className='task-list' ref={elementRef} onMouseDown={startNewSchedule} onClick={endNewSchedule} onMouseUp={onEndMouseEvent} >
         {hours.map((hour, idx) => <SchedulePreviewHour key={idx} hour={hour} idx={idx} earlierTaskHour={earlierTaskHour} />)}
         {template.map((item, idx) => <TaskGridTemplate key={idx} item={item} hours={hours} />)}
         {tasks.map(task => <TaskPreview key={task.id} task={task} />)}
      </ul >
   )
}
