import axios from '../../axios/axios'
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import './update_pair.css'
import toast, { Toaster } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'


const UpdatePair = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [rate, setRate] = useState('')
  const [pairs, setPairs] = useState([])
  const { setAuth } = useAuth()


  useEffect(() => {
    getPairs()
  }, [pairs])

  const sendData = async (e) => {
    e.preventDefault();
    let response;
    const toastId = toast.loading('Updating...');
    try {
      if (rate !== '') {
        response = await axios.post('/update',
          {
            from: from,
            to: to,
            rate: rate,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
      } else {
        toast.error('Please choose pair', {
          id: toastId,
        });
      }
      if (response && response.status === 200) {
        toast.success(response.data, {
          id: toastId,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data, {
          id: toastId,
        });
        setAuth({});
      } else if (error.response && error.response.status === 405) {
        toast.error(error.response.data, {
          id: toastId,
        });
      } else {
        console.error(error);
      }
    }
  };
  

  const getPairs = async () => {
    let response
    response = await axios.get(`/pairs`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    if (response.status === 200) {
      setPairs(response.data)
    }
  }


  return (
    <div className="updatePair">
      <Header />
      <div className="updatePairContainer">
        <div className="update-container">
          <div className="update-inner-container">
            <label htmlFor="amount">From</label>
            <div className="input-container">
              <input
                type="text"
                className="update-input disabled"
                placeholder="Pair 1.."
                pattern="^[0-9]*[.,]?[0-9]*$"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="update-inner-container">
            <label htmlFor="amount">To</label>
            <div className="input-container">
              <input
                type="text"
                className="update-input disabled"
                placeholder="Pair 2.."
                pattern="^[0-9]*[.,]?[0-9]*$"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="update-inner-container">
            <label htmlFor="amount">Ratio</label>
            <div className="input-container">
              <input
                type="text"
                className="update-input"
                placeholder="0.0"
                pattern="^[0-9]*[.,]?[0-9]*$"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
          </div>
          <button className="update-button" onClick={sendData}>Update</button>
        </div>
        <div className="scroll-bg">
          {pairs &&
            pairs.map((pair) => (
              <div className="get-pairs">
                <h3>{`${pair.from} ➙ ${pair.to} (${pair.rate})`}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setFrom(pair.from)
                    setTo(pair.to)
                    setRate(pair.rate)
                  }}
                >Choose
                </button>
              </div>
            ))}
        </div>
      </div>
        <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default UpdatePair