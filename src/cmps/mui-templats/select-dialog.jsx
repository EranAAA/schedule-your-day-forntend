import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useOutletContext } from "react-router-dom"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { MdOutlineEditCalendar } from 'react-icons/md'

import { utilService } from '../../services/util.service'

export const DialogSelect = ({ task }) => {

   const { updateTask } = useOutletContext()
   const { hoursTemplate, dayNamesTemplate } = useSelector(({ scheduleModule }) => scheduleModule.template)

   const [daysFrom, setDaysFrom] = useState('')
   const [daysTo, setDaysTo] = useState('')
   const [hoursFrom, setHoursFrom] = useState('')
   const [hoursTo, setToHour] = useState('')

   const [isWrongDate, setIsWrongDate] = useState(false)
   const [open, setOpen] = useState(false)

   useEffect(() => {
      const { days, hours } = utilService.getTimeFormatted(task.date)
      setDaysFrom(days[0])
      setDaysTo(days[1])
      setHoursFrom(hours[0])
      setToHour(hours[1])
   }, [])

   const handleChange = (event) => {
      if (event.target.name === 'daysFrom' || event.target.name === 'daysTo') {
         if (event.target.name === 'daysFrom') setDaysFrom((event.target.value))
         if (event.target.name === 'daysTo') setDaysTo((event.target.value))
         onSaveChange(event.target.name, utilService.convertDayToNumber(event.target.value, event.target.name))
      }

      if (event.target.name === 'hoursFrom' || event.target.name === 'hoursTo') {
         if (event.target.name === 'hoursFrom') setHoursFrom((event.target.value))
         if (event.target.name === 'hoursTo') setToHour((event.target.value))
         onSaveChange(event.target.name, utilService.convertHourToNumber(event.target.value))
      }
   }

   const handleClickOpen = () => {
      setOpen(true);
   }

   const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
         setOpen(false);
      }
   }

   const onSaveChange = (name, value) => {
      const updatingTask = { ...task }
      updatingTask.date[name] = value
      if (updatingTask.date.hoursFrom > updatingTask.date.hoursTo ||
         updatingTask.date.hoursFrom > updatingTask.date.hoursTo) {
         return setIsWrongDate(true)
      }
      updateTask(updatingTask)
      setIsWrongDate(false)
   }

   return (
      <div>
         <Button className='open-dialog-btn' onClick={handleClickOpen}><MdOutlineEditCalendar /></Button>
         <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogContent>
               <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>

                  <FormControl sx={{ m: 0.5, minWidth: 130 }}>
                     <InputLabel sx={{ fontSize: 12 }}>From Day</InputLabel>
                     <Select value={daysFrom} onChange={handleChange} sx={{ fontSize: 12, height: 35 }} name="daysFrom" input={<OutlinedInput label="From Day" />} >
                        {dayNamesTemplate.map((day, idx) => <MenuItem sx={{ fontSize: 12 }} key={idx} value={day}>{day}</MenuItem>)}
                     </Select>
                  </FormControl>

                  <FormControl sx={{ m: 0.5, minWidth: 130 }}>
                     <InputLabel sx={{ fontSize: 12 }}>To Day</InputLabel>
                     <Select value={daysTo} onChange={handleChange} sx={{ fontSize: 12, height: 35 }} name="daysTo" input={<OutlinedInput label="To Day" />} >
                        {dayNamesTemplate.map((day, idx) => <MenuItem sx={{ fontSize: 12 }} key={idx} value={day}>{day}</MenuItem>)}
                     </Select>
                  </FormControl>

                  <FormControl sx={{ m: 0.5, minWidth: 130 }}>
                     <InputLabel sx={{ fontSize: 12 }}>Start At</InputLabel>
                     <Select value={hoursFrom} onChange={handleChange} MenuProps={{ PaperProps: { sx: { maxHeight: 220 } } }} sx={{ fontSize: 12, height: 35 }} name="hoursFrom" input={<OutlinedInput label="Start At" />} >
                        {hoursTemplate.map((hour, idx) => <MenuItem sx={{ fontSize: 12 }} key={idx} value={hour.hour}>{hour.hour}</MenuItem>)}
                     </Select>
                  </FormControl>

                  <FormControl sx={{ m: 0.5, minWidth: 130 }}>
                     <InputLabel sx={{ fontSize: 12 }}>End At</InputLabel>
                     <Select value={hoursTo} onChange={handleChange} MenuProps={{ PaperProps: { sx: { maxHeight: 220 } } }} sx={{ fontSize: 12, height: 35 }} name="hoursTo" input={<OutlinedInput label="End At" />} >
                        {hoursTemplate.map((hour, idx) => <MenuItem sx={{ fontSize: 12 }} key={idx} value={hour.hour}>{hour.hour}</MenuItem>)}
                     </Select>
                  </FormControl>
               </Box>

               {isWrongDate && <div className="msg">You'r schedule do not make sense, please try different date</div>}
            </DialogContent>
            <DialogActions>
               <Button variant="h5" onClick={handleClose}>Cancel</Button>
               <Button variant="h5" onClick={handleClose}>Ok</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}