import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const emails = ['username@gmail.com', 'user02@gmail.com'];

const SimpleDialog = (props) => {
   const { onClose, selectedValue, open, schedules, onRemoveSchedule } = props;

   const handleRemove = (scheduleId) => {
      onClose(selectedValue);
      onRemoveSchedule(scheduleId)
   };

   const handleClose = () => {
      onClose(selectedValue);
   }

   return (
      <Dialog onClose={handleClose} open={open}>
         <DialogTitle>Your Schedule boards</DialogTitle>
         <List sx={{ pt: 0 }}>
            {schedules.map(schedule => (
               <ListItem button onClick={(ev) => {ev.preventDefault(); handleRemove(schedule._id)}} key={schedule._id}>
                  <div className="list-dialog-item">{schedule.title}</div>
               </ListItem>
            ))}
            { !schedules.length && <div className="list-dialog-item">No other schedule to remove</div>}
         </List>
      </Dialog>
   );
}

SimpleDialog.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   selectedValue: PropTypes.string.isRequired,
};

export const ListDialog = ({ schedules, schedule, onRemoveSchedule }) => {

   const [open, setOpen] = useState(false);
   const [selectedValue, setSelectedValue] = useState(emails[1])
   const [filterdSchedules, setFilterdSchedules] = useState('')

   useEffect(() => {
      setFilterdSchedules(schedules.filter(sched => sched._id !== schedule._id))
   },[])

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
   };

   if (!filterdSchedules) return
   return (
      <div>
         <Button className="remove-btn" variant="h5" onClick={handleClickOpen}> Remove Schedule </Button>
         <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            schedules={filterdSchedules}
            onRemoveSchedule={onRemoveSchedule}
         />
      </div>
   );
}