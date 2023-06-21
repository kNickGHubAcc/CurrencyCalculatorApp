import useAuth from './useAuth'
import axios from '../axios/axios'

const useRefreshToken = () => {
  const { setAuth } = useAuth()   //Χρήση του useAuth() για πρόσβαση στην μέθοδο setAuth του context εξουσιοδότησης

  //Ανανέωση του token εξουσιοδότησης όταν αυτό λήγει και ενημέρωση των πληροφοριών εξουσιοδότησης
  const refresh = async () => {
    try
    {
      const response = await axios.get('/refresh', {   //Request για ανανέωση του token εξουσιοδότησης
        withCredentials: true,
      })
      if (response.status === 200) {  //Αν τα δεδομένα εξουσιοδότησης έχουν ανανεωθεί
        setAuth(response.data)   //Ενημέρωση των πληροφοριών εξουσιοδότησης με βάση τα δεδομένα του response
        return refresh.data       //άρα και ενημέρωση του token εξουσιοδότησης
      }
    } catch (error) {
      console.log(error);
    }
  }
  return refresh
}

export default useRefreshToken