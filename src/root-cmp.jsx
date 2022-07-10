import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { getMessaging, onMessage } from "firebase/messaging";
import { featchToken, sendNotification } from './services/firebase.service';

import './assets/style/main.scss'
import { HomePage } from './pages/app-home'
import { AppSchedule } from './pages/app-schedule'
import { TaskDetails } from './pages/task-details'
import { ScheduleDetails } from './pages/schedule-details'
import { NotificationDetails } from './pages/notification-details'
import { LoginSignup } from './pages/login-signup'

export function RootCmp() {

   const messaging = getMessaging();
   const [notification, setNotification] = useState({})
   const [isShown, SetIsShown] = useState(false)
   const [myToken, setMyToken] = useState(false)

   useEffect(() => {
      getToken()
   }, [])

   useEffect(() => {
      SetIsShown(true)
   }, [notification])

   const getToken = async () => {
      const token = await featchToken()
      setMyToken(token)
      // console.log('token', token);
   }

   onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload)
      let data = { ...notification }
      data = payload.notification
      setNotification(data)
   })

   // const onSendNotification = async () => {
   //    await sendNotification(myToken)
   // }

   return (
      <div>
         {isShown && <div>{notification.body}</div>}
         {isShown && <div>{notification.title}</div>}

         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login-signup" element={<LoginSignup />} />
            <Route path="/schedule/:scheduleId/" element={<AppSchedule />}>
               <Route path="notification" element={<NotificationDetails />} />
               <Route path="details" element={<ScheduleDetails />} />
               <Route path=":taskId" element={<TaskDetails />} />
            </Route>
         </Routes>
      </div>
   )
}

