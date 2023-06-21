import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography} from '@mui/material';
import axios from '../../axios/axios';
import Header from '../header/Header';

const useStyles = makeStyles((theme) => ({
  scrollBg: {
    border: '5px solid black',
    height: '25rem',
    backgroundColor: '#8B0000',
    overflow: 'hidden',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    marginTop: '7rem',
    marginLeft: '28rem',
    borderRadius: '2rem',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  getPairs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
    borderRadius: '4rem',
    padding: '2.5rem',
    marginTop: '1rem',
    width: '80%',
    height: '10%'
  },
  getPairsHeading: {
    padding: '1.2rem',
  },
}));

function ReadPairs() {
  const classes = useStyles();
  const [pairs, setPairs] = useState([]);

  useEffect(() => {     //Εκτέλεση getPairs κατά την φόρτωση της σελίδας
    getPairs();
  }, []);

  const getPairs = async () => {
    try {
      const response = await axios.get(`/pairs`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response.status === 200) {
        setPairs(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <>
      <Header />
      <Box className={classes.scrollBg}>
        {pairs &&
          pairs.map((pair) => (
            <Box key={pair.id} className={classes.getPairs}>
              <Typography className={classes.getPairsHeading}>
                {`${pair.from} ➙ ${pair.to} (${pair.rate})`}
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
}

export default ReadPairs;