import React, { useState, useRef, useEffect } from 'react'

import { utilService } from '../services/util.service'

export const TaskGridTemplate = ({ item, hours }) => {

   const [isHovering, setIsHovering] = useState(false)
   const [isCurrentHour, setIsCurrentHour] = useState(false)
   const ref = useRef(null);

   useEffect(() => {
      if (Number(item.row) - 1 === utilService.getHourNum()) {
         setIsCurrentHour(true)
      }
   }, [])


   const handleMouseOver = () => {
      setIsHovering(true)
   }

   const handleMouseOut = () => {
      setIsHovering(false)
   }

   return (
      <li className='task-grid-template' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={ref}
         style={{
            gridRow: `${item.row}`,
            gridColumn: `${item.column}`,
            borderTop: `${isCurrentHour && '1px solid red'}`
         }}>
         {isHovering && `${hours[parseInt(item.row) - 1].hour} - ${hours[parseInt(item.row)].hour}`}
      </li>
   )
}