import React from 'react'
import { useSelector } from 'react-redux'

import { TaskList } from './task-list'
import { SchedulePreviewDay } from './schedule-preview-day'

export const ScheduleList = ({ schedule }) => {

   const { gridTemplate, dayNamesTemplate, hoursTemplate } = useSelector(({ scheduleModule }) => scheduleModule.template)

   if (!gridTemplate) return

   return (
      <main className='schedule-list'>
         <div className="days-section">
            <ul className="days-container">{dayNamesTemplate.map((day, idx) => <SchedulePreviewDay key={idx} day={day} />)}</ul>
         </div>
         <TaskList tasks={schedule.tasks} template={gridTemplate} hours={hoursTemplate} />
      </main>
   )
}
