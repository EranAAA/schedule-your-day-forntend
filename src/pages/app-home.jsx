import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';
import { loadUsers } from '../store/user/user.action'
import home from '../assets/imgs/home.svg'

export const HomePage = () => {

   const dispatch = useDispatch()

   useEffect(() => {
      loadData()
   }, [])

   const loadData = async () => {
      await dispatch(loadUsers())
   }

   return (
      <main className='home-page' style={{backgroundImage: '../assets/imgs/home-page.svg'}}>
         <img src={home}  alt="" />
         <h1 className='title'>Schedule Your Day</h1>
         <p className='sub-title'>
            Is the perfect companion for school, college or university. <br />
            in simple signup you can build your perfect online week schedule
         </p>

         <Link className='link' to='/login-signup' >
            <Button variant="contained" color='success' sx={{ mt: 3, mb: 0 }} >Login / Signup</Button>
         </Link>

      </main>
   )
}