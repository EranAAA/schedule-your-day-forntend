import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

export const Table = ({ notifications, onNotificationCanceled }) => {

   if (!notifications) return

   const DateDisplay = (schedule) => {
      const date = new Date(schedule)
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return date.toLocaleDateString('en-GB', options)
   }

   const columns = [
      { field: 'tag', headerName: 'Tag', width: 70 },
      { field: 'title', headerName: 'Title', width: 130 },
      { field: 'body', headerName: 'Body', width: 200 },
      { field: 'time', headerName: 'Time', width: 150 },
      {
         field: 'remove',
         headerName: 'Remove',
         renderCell: (params) => (
            <strong>
               {params.value}
             <Button
               color="error"
               size="small"
               tabIndex={params.hasFocus ? 0 : -1}
               onClick={(event) => {event.stopPropagation(); onNotificationCanceled(params.row.id, params.row.tag);}}
             >
               Remove
             </Button>
           </strong>
         ),
       },
   ];

   const rows = notifications.map(notification =>
   ({
      id: notification._id,
      tag: notification.tag,
      title: notification.title,
      body: notification.body,
      time: DateDisplay(notification.time),
   }))

   return (
      <div style={{ height: 200, width: '100%' }}>
         <DataGrid
            rows={rows}
            rowHeight={25}
            headerHeight={25}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
         />
      </div>
   );
}
