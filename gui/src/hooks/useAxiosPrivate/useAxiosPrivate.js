import { useEffect } from 'react'
import useRefreshToken from '../useRefreshToken'
import { axiosPrivate } from '../.././axios/axios'


const useAxiosPrivate = () => {
  const refresh = useRefreshToken()

  useEffect(() => {
    refresh()
  }, [])

  return axiosPrivate
}

export default useAxiosPrivate