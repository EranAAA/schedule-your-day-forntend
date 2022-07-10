import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const Signup = ({ setCredentials, setIsOnLogin, setIsLoginError }) => {

   const [isSignupError, setIsSignupError] = useState(false)
   const [msg, setMsg] = useState('')

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!data.get('email') || !data.get('password') || !data.get('fullname')) {
         setMsg('Please fill all fields')
         return setIsSignupError(true)
      } else if (!data.get('email').match(validEmailRegex)) {
         setMsg('You have entered an invalid email address!')
         return setIsSignupError(true) 
      } else {
         setCredentials({
            email: data.get('email').toLocaleLowerCase(),
            password: data.get('password'),
            fullname: data.get('fullname')
         })
         setIsSignupError(false)
      }
   }

   const onChangeMethod = () => {
      setIsOnLogin(true)
      setIsLoginError(false)
   }

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
               <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                  <LockOutlinedIcon />
               </Avatar >
               <Typography component="h1" variant="h5">
                  Sign up
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField margin="normal" required fullWidth id="fullname" label="Full Name" name="fullname" autoFocus />
                  <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                  <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
                  <Grid container>

                     <Grid item>
                        <Link href="#" onClick={onChangeMethod} variant="body2"> {"Don't have an account? Log In"} </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
         {isSignupError && <div className="msg">{msg}</div>}
      </ThemeProvider>
   );
}