import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container, TextField} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AiOutlineClose} from 'react-icons/ai'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import toast, { Toaster } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import axios from '../../axios/axios'


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const theme = createTheme();

  const createUser = async () => {
    let response;
    const toastId = toast.loading('Loading...');
  
    try {
      if (username !== '' && password !== '') {
        response = await axios.post('/register', { username, password });
        console.log(response.data);
        toast.success('User registered successfully!', {
          id: toastId,
        });
      } else {
        toast.error('Both inputs required', {
          id: toastId,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Username already exists!', {
          id: toastId,
        });
      } else {
        console.error(error);
      }
    }
  }
  
  
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
            style={{marginLeft: '350px', fontSize: '2.2rem', color: '#000000'}}
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
        <Typography style={{color: '#000000'}} component="h3" variant="h4"> Create your Account </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            type="username"
            autoComplete="username"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
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
              createUser();
            }}
          >Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link 
                style={{marginLeft: '90px', color: '#000000', fontSize: '1rem'}}
                variant="body2"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/login')
                }}
              > {"Already Have Account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default Signup;