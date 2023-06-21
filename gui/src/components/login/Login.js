import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container, TextField} from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../axios/axios'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setAuth} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const theme = createTheme();
  
  const authUser = async () => {              // Συνάρτηση για την αυθεντικοποίηση του χρήστη κατά την σύνδεση
    let response;
    const toastId = toast.loading('Loading...');
  
    try {
      if (username !== '' && password !== '') {
        response = await axios.post(`/login`,
          JSON.stringify({ username, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
  
        if (response.status === 200) {
          const token = response?.data?.token;
          const username = response?.data?.username;
          setAuth({ username, token });
          toast.success('Welcome', {
            id: toastId,
          });
          navigate(from, { replace: true });
        }
      } else {
        toast.error('Both inputs required', {
          id: toastId,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data, {
          id: toastId,
        });
      } else {
        console.log(error);
      }
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <AiOutlineClose
            style={{marginLeft: '350px', fontSize: '2.2rem', color: '#000000' }}
            className="back-button"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          />
        <Box/>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography style={{color: '#000000'}} component="h3" variant="h4"> Login to your account </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            type="username"
            autoComplete="username"
            value = {username}
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => {
              e.preventDefault();
              authUser()
            }}
          >Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link 
                style={{marginLeft: '85px', color: '#000000', fontSize: '1rem', fontWeight: '200'}}
                variant="body2"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/signup')
                }}
              > {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        </Box>
        <Toaster position="top-center" reverseOrder={false} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;