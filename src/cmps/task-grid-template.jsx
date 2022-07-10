import React, { useState, useRef } from 'react'

export const TaskGridTemplate = ({ item, hours }) => {

   const [isHovering, setIsHovering] = useState(false)
   const ref = useRef(null);

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
            gridColumn: `${item.column}`
         }}>
         {isHovering && `${hours[parseInt(item.row) - 1].hour} - ${hours[parseInt(item.row)].hour}`}
      </li>
   )
}