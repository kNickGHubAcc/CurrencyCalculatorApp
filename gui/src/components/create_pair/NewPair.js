import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import toast, { Toaster } from 'react-hot-toast'
import Header from '../header/Header'
import useAuth from '../../hooks/useAuth'
import axios from '../../axios/axios'


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4.5rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#006400',
    width: '40%'
  },
  textField: {
    marginBottom: '1rem',
    backgroundColor: '#DAA520',
    width: '100%',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#2172E5',
    color: 'black',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));


const CreatePair = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [rate, setRate] = useState('')
  const { setAuth } = useAuth()

  const classes = useStyles();

  const sendData = async (e) => {       // Στέλνει τα δεδομένα στο api με σκοπό την δημιουργία ζεύγους
    e.preventDefault()
    let response
    const toastId = toast.loading('Adding...')
    try {
      if (from !== '' && to !== '' && rate !== '') {
        response = await axios.post(`/create`,
          {
            from: from,
            to: to,
            rate: rate,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )
      } else {
        toast.error('Please Fill All The Inputs!', {
          id: toastId,
        })
      }
      if (response.status === 200) {
        toast.success(response.data, {
          id: toastId,
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data, {
          id: toastId,
        })
        setAuth({})
      } else if (error.response && error.response.status === 405) {
        toast.error(error.response.data, {
          id: toastId,
        })
      } 
    }
  }
  

  return (
    <>
      <Header />
      <div className={classes.container}>
        <form className={classes.form} onSubmit={sendData}>
          <TextField
            className={classes.textField}
            label="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
          <TextField
            className={classes.textField}
            label="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
          <TextField
            className={classes.textField}
            label="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
          <Button
            style={{fontWeight: 'bold'}}
            className={classes.button}
            variant="contained"
            type="submit"
            >Submit
          </Button>
        </form>
      </div>
    <Toaster position="top-center" />
    </>
  );
}

export default CreatePair;