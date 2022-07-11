import React, { useRef, useEffect, useState } from 'react'

import { utilService } from '../services/util.service'

export const SchedulePreviewHour = ({ hour, idx, earlierTaskHour, tasks }) => {

   const scollToRef = useRef();
   const [isCurrentHour, setIsCurrentHour] = useState(false)

   useEffect(() => {
      if (!earlierTaskHour) {
         if (idx === utilService.getHourNum() - 2) scollToRef.current.scrollIntoView()
      }
      else {
         if (idx === earlierTaskHour - 3) scollToRef.current.scrollIntoView()
      }
      if (idx === utilService.getHourNum()) setIsCurrentHour(true)
   }, [earlierTaskHour, tasks])

   return (
      <li className='schedule-preview-hour' ref={scollToRef}
         style={{
            gridRow: `${idx + 1}/${idx + 1}`,
            gridColumn: `${1}/${1}`,
            color: `${isCurrentHour && 'red'}`,
            textDecoration: `${isCurrentHour && 'overline'}`,
            height: `${isCurrentHour && '16px'}`

         }}>
         {hour.hour}
      </li>
   )
}