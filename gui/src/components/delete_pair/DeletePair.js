import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import toast, {Toaster} from 'react-hot-toast'
import Header from '../header/Header'
import useAuth from '../../hooks/useAuth'
import axios from '../../axios/axios'


const DeletePairContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
  margin-left: 22rem;
  width: 60%;
  height: 25rem;

`
const DeletePairs = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #006400;
  border-radius: 4rem;
  padding: 1rem;
  margin-top: 1rem;
  width: 80%;
  height: 10rem

  h3 {
    padding: 1.25rem;
  }

  button {
    padding: 0.75rem;
    border-radius: 2rem;
    background-color: rgb(199, 4, 4);
    font-weight: 600;
    cursor: pointer;
    border-color: rgb(199, 4, 4);
    color: wheat;

    &:hover {
      background-color: rgb(238, 30, 30);
    }
  }
`
const DeletePairScrollBg = styled('div')`
  border: 5px solid black;
  border-radius: 2rem;
  height: 35rem;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: #191970;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    height: 37rem;
    width: 90%;
  }
`

const DeletePair = () => {
  const [pairs, setPairs] = useState([])
  const { setAuth } = useAuth()

  useEffect(() => {
    getPairs()
  }, [pairs])

  const sendData = async (e, from, to) => {       //Στέλνει request για διαγραφή ζεύγους νομισμάτων
    e.preventDefault()
    let response
    const toastId = toast.loading('Deleting...')
    try {
      if (from !== '' && to !== '') 
      {
        response = await axios.delete(`/delete`, {data: {
            from: from,
            to: to,
          },
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data, {
          id: toastId,
        })
        setAuth({})
      } else if (error.response.status === 405) {
        toast.error(error.response.data, {
          id: toastId,
        })
      }
    }
    if (response.status === 200) {
      toast.success(response.data, {
        id: toastId,
      })
    }
  }

  const getPairs = async () => {              //Λήψη ζευγαριών από το api
    let response
    response = await axios.get(`/pairs`, {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true,
    })
  if (response.status === 200) {
    setPairs(response.data)
  }
}


return (
    <Box className="deletePair">
    <Header />
    <DeletePairContainer >
      <DeletePairScrollBg>
          {pairs.map((pair) => (
            <DeletePairs key={`${pair.from}-${pair.to}`}>
              <Typography variant="h7">{`${pair.from} ➙ ${pair.to} (${pair.rate})`}</Typography>
              <Button
                onClick={(e) => sendData(e, pair.from, pair.to)}
                variant="contained"
                className="get-button"
                style={{position: 'relative', left: '40px'}}
              >Delete
              </Button>
            </DeletePairs>
          ))}
      </DeletePairScrollBg>
    </DeletePairContainer>
    <Toaster position="top-center" reverseOrder={false} />
    </Box>
  )
}

export default DeletePair;