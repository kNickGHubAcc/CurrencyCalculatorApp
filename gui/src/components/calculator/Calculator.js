import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Grid, Typography } from '@mui/material';
import './calculator.css';
import axios from '../../axios/axios';


const Calculator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [ratio, setRatio] = useState('');
  const [fromValue, setFromValue] = useState('EURO');
  const [toValue, setToValue] = useState('EURO');
  const [amountValue, setAmountValue] = useState('');


  const getCurrencies = async () =>       //Αποστολή request για την λήψη των διαθέσιμων νομισμάτων
  {
    setIsLoading(true);
    const response = await axios.get('/currencies');
    if (response.status === 200) {
      setCurrencies(response.data);
      setIsLoading(false);
    }
  };

  const getConvertedValue = async (e) =>    // Αποστολή request για μετατροπή της αξίας
  {
    e.preventDefault();
    let response;
    if (amountValue !== '') {
      response = await axios.post(`/rates`, {
        amount: amountValue,
        from: fromValue,
        to: toValue,
      });
    }
    if (response.status === 200) {
      setRatio(response.data);
    }
  };

  useEffect(() =>     // Ανάκτηση των νομισμάτων κατά τη φόρτωση της σελίδας
  {
    getCurrencies();
  }, []);

  return (
    <div className="calculator">
      <h1 className="title">Currency Calculator</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={getConvertedValue}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="field"
                // label="From"
                select
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="field"
                // label="To"
                select
                value={toValue}
                onChange={(e) => setToValue(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="field"
                // label="Amount"
                value={amountValue}
                onChange={(e) => setAmountValue(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{fontWeight: 'bold'}}
                variant="contained"
                type="submit"
                className="convert-button"
                >Convert
              </Button>
            </Grid>
            {ratio && (
              <Grid item xs={12} className="result-container">
                <Typography
                  style={{fontWeight: 'bold', color: 'white'}}
                  variant="subtitle1"
                  className="result"
                  >{ratio}
                </Typography>
              </Grid>
            )}
            </Grid>
        </form>
      )}
    </div>
  );
};

export default Calculator;