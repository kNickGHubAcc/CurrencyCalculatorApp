import { useEffect } from 'react'
import useRefreshToken from '../useRefreshToken'
import useAuth from '../useAuth'
import { axiosPrivate } from '../.././axios/axios'

//Χρησιμοποιείται για την αυτόματη ενημέρωση του access token και του header 'Authorization' σε κάθε request που γίνεται με το axiosPrivate.
const useAxiosPrivate = () => {
  const refresh = useRefreshToken()   //Για ανανέωση του access token
  const { auth } = useAuth()    //Για να πάρουμε τον τρέχοντα authenticated χρήστη

  useEffect(() => 
  { 
    //Εγκατάσταση του request interceptor για την προσθήκη του header 'Authorization' με το access token σε κάθε request.
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )
  
    //Εγκατάσταση του response interceptor για την αντιμετώπιση του κωδικού 403 (Forbidden) και την ανανέωση του access token.
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate