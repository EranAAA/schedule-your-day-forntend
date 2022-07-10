import React, { useState, useEffect } from 'react'
import { useOutletContext, useNavigate, } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { notificationScheduled, notificationCanceled } from '../services/sw.service'

import { updateNotification, removeNotification, loadNotifications } from '../store/notification/notification.action'

import { Form } from '../cmps/mui-templats/form'
import { Table } from '../cmps/mui-templats/table'

export const NotificationDetails = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate();

   const user = useSelector(({ userModule }) => userModule.user)
   const notifications = useSelector(({ notificationModule }) => notificationModule.notifications)

   const { schedule } = useOutletContext()


   useEffect(() => {
      load()
   }, [])

   const load = async () => {
      const data = await dispatch(loadNotifications(user._id))
   }

   const onScheduleNotification = async (title, body, tag, time) => {
      await notificationScheduled(title, body, tag, time)
      await dispatch(updateNotification({ title, body, tag, time, userId: user._id }))
      load()
   }

   const onNotificationCanceled = async (id, tag) => {
      await notificationCanceled(tag)
      await dispatch(removeNotification(id))
   }

   const onClose = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      navigate(-1)
   }

   return (
      <main className='notification-details' >
         <div className="notification-contianer" >
            <button className="close-btn" onClick={onClose}>X</button>

            <div className="notification-form">
               <p >Set your personal notification</p>
               <Form tasks={schedule.tasks} onScheduleNotification={onScheduleNotification} />
            </div>

            <Table notifications={notifications} onNotificationCanceled={onNotificationCanceled} />
         </div>

      </main>
   )
}
