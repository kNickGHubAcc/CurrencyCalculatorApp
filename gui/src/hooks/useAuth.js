import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

//Τα components που χρησιμοποιούν το useAuth() μπορούν
//να αποκτούν πρόσβαση στις πληροφορίες εξουσιοδότησης
const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth