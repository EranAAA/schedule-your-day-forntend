
import React, { useState } from "react";
import Switch from '@mui/material/Switch';

export const ColorSwitches = ({ task, updateTask }) => {

   const [isImportant, setIsImportant] = useState(task.isImportant || false)

   const handleChange = (ev) => {
      ev.preventDefault();
      const updatedTask = { ...task }
      if (updatedTask?.isImportant) {
         updatedTask.isImportant = ev.target.value === 'true' ? false : true
      } else {
         updatedTask.isImportant = ev.target.value === 'true' ? false : true
      }
      setIsImportant(ev.target.value === 'true' ? false : true)
      updateTask(updatedTask)
   }

   return (
      <div>
         <Switch
            className="switch1"
            color="error"
            checked={isImportant}
            value={isImportant}
            onChange={handleChange}
         />
      </div>
   );
}
