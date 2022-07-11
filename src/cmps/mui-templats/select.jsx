import React, { useState } from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BasicSelect = ({ schedules, toggleBoard, currentSchedule }) => {

   if (!schedules.length) return
   if (!currentSchedule) return

   const [switchSchedule, setSwitchSchedule] = useState(currentSchedule)

   const handleChange = (ev) => {
      ev.preventDefault()
      const pickedSchedule = schedules.find(schedule => schedule.title === ev.target.value)
      if (pickedSchedule) {
         toggleBoard(pickedSchedule)
         setSwitchSchedule(pickedSchedule)
      } else {
         console.log('cannot find schedule')
      }
   }

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Schedule</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={switchSchedule.title}
               label="Schedule"
               onChange={handleChange}
               sx={{ fontSize: 14, height: 35, width: 170 }}
            >
               {schedules.length && schedules.map(schedule => <MenuItem sx={{ fontSize: 12, }} key={schedule._id} value={schedule.title} >{schedule.title}</MenuItem>)}
            </Select>
         </FormControl>
      </Box>
   );
}