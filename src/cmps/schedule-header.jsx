import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AiOutlineLogout } from 'react-icons/ai'
import logo from '../assets/imgs/logo.png'

export const ScheduleHeader = ({ logOut, user }) => {

   const navigate = useNavigate();

   const onLogOut = () => {
      logOut()
      navigate('/')
   }
   
   return (
      <main className='schedule-header'>
         <img src={logo} alt="" />
         <div className="user-container">
            <div className="user-name">{user.fullname}</div>
            <div onClick={onLogOut} title='Logout' className="logout"><AiOutlineLogout /></div>
         </div>
      </main>
   )
}