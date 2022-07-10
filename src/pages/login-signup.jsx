import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Signup } from '../cmps/signup'
import { Login } from '../cmps/login'

import { onSignup, onLogin } from '../store/user/user.action'
import login1 from '../assets/imgs/login1.svg'

export const LoginSignup = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate();
   const users = useSelector(({ userModule }) => userModule.users)

   const [credentials, setCredentials] = useState('')
   const [isOnLogin, setIsOnLogin] = useState(true)
   const [isLoginError, setIsLoginError] = useState(false)

   useEffect(() => {
      if (!credentials) return
      if (isOnLogin) loginUser()
      if (!isOnLogin) signupNewUser()

   }, [credentials])

   const signupNewUser = async () => {
      const isAllreadyUser = users.some(user => credentials.email === user.email)
      if (isAllreadyUser) return console.log('isAllreadyUser', credentials);

      const user = await dispatch(onSignup(credentials))
      if (user)  {
         navigate('/schedule/new')
      } else {
      }
   }

   const loginUser = async () => {
      const user = await dispatch(onLogin(credentials))
      if (user && user.email === credentials.email) {
         navigate('/schedule/*')
         setIsLoginError(false)
      } else {
         setIsLoginError(true)
      }
   }

   return (
      <main className='login-signup'>
         <img src={login1} alt="" />
         {isOnLogin && <Login setCredentials={setCredentials} setIsOnLogin={setIsOnLogin} setIsLoginError={setIsLoginError} />}
         {!isOnLogin && <Signup setCredentials={setCredentials} setIsOnLogin={setIsOnLogin} setIsLoginError={setIsLoginError} />}
         {isLoginError && <div className="msg">Your email or password is incorrect.</div>}
      </main>
   )
}