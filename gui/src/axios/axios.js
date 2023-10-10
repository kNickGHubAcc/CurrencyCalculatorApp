import axios from 'axios'

const BASE_URL = 'https://my-currency-calculator-api.vercel.app/'

//Δημιουργία ενός αντικειμένου axios το οποίο θα χρησιμοποιηθεί
//με σκοπό την αποστολή http requests στον server
export default axios.create({
  baseURL: BASE_URL,
})

//Δημιουργία ενός αντικειμένου axiosPrivate το οποίο θα χρησιμοποιηθεί
//με σκοπό την αποστολή http requests τα οποία θα περιέχουν
//και επιπλέον δεδομένα (π.χ headers, cookies)
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
})