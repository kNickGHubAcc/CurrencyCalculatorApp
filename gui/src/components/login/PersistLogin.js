import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate/useAxiosPrivate'


const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useAxiosPrivate()
  const { auth } = useAuth()

  useEffect(() => {
    let isMounted = true      //Μεταβλητή που χρησιμοποιείται για να ελέγξουμε αν ο κώδικας εξακολουθεί να εκτελείται
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }
    verifyRefreshToken()

    // Έλεγχος αν ο χρήστης έχει ήδη συνδεθεί ή όχι.
    // Αν δεν έχει συνδεθεί, εκτελείται και πάλι η ανανέωση του token
    !auth?.username ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`accessToken: ${auth?.token}`)
  }, [isLoading])
  return <div>{isLoading ? <p>Loading...</p> : <Outlet />}</div>
}

export default PersistLogin