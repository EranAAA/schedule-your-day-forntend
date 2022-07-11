import React, { useState } from "react";

import moment from 'moment';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { utilService } from "../../services/util.service";

export const Form = ({ tasks, onScheduleNotification }) => {

   if (!tasks.length) return

   const [task, setTask] = useState(tasks[0] || {})
   const [title, setTitle] = useState(tasks[0].title || '')
   const [body, setBody] = useState(tasks[0].description || '')
   const [time, setTime] = useState(Date.now())

   const handleChange = (ev) => {
      ev.preventDefault()

      if (ev.target.name === 'Title') setTitle(ev.target.value)
      if (ev.target.name === 'Body') setBody(ev.target.value)
      if (ev.target.name === 'Task') {
         setTask(ev.target.value)
         setTitle(ev.target.value.title)
         setBody(ev.target.value.description)
      }
      if (ev.target.name === 'Time') {
         const timeFormatted = new Date(ev.target.value).getTime()
         setTime(timeFormatted)
      }
   }

   const onSchedule = (ev) => {
      ev.preventDefault()
      onScheduleNotification(title, body, utilService.makeId(5), time)
   }

   const displayTime = () => {
      let display = ''
      if (time) display = moment(new Date(time)).format('YYYY-MM-DDTHH:mm')
      else display = moment(new Date()).format('YYYY-MM-DDTHH:mm')
      return display
   }

   return (
      <>
         <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
               <InputLabel sx={{ fontSize: 12 }} id="demo-simple-select-label">Tasks</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={task}
                  label="Tasks"
                  name="Task"
                  onChange={handleChange}
                  sx={{ fontSize: 14, height: 35, width: 170 }}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 220, maxWidth: 350 } } }}
               >
                  {tasks.length && tasks.map(taskDisplay => <MenuItem sx={{ fontSize: 12, }} key={taskDisplay.id} value={taskDisplay} >{`${taskDisplay.title}`}</MenuItem>)}
               </Select>
            </FormControl>
         </Box>

         <Box className="text-field" component="form" sx={{ '& > :not(style)': { m: 1, width: '30ch', }, }} noValidate autoComplete="off" >
            <TextField id="standard-basic" label="Title" variant="standard" value={title} name='Title' onChange={handleChange} />
            <TextField id="standard-basic" label="Body" variant="standard" value={body} name="Body" onChange={handleChange} />
         </Box>

         <Stack className="time-field" component="form" noValidate spacing={0}>
            <TextField
               id="datetime-local"
               label='Time'
               name="Time"
               type="datetime-local"
               onChange={handleChange}
               value={displayTime()}
               sx={{ width: 250, fontSize:14}}
               InputLabelProps={{
                  shrink: true,
               }}
            />
         </Stack>

         <div className="notification" onClick={onSchedule} >Set Notification</div>
      </>
   )
}