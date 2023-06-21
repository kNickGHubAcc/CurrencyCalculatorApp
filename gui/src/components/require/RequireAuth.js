import { useLocation, Navigate, Outlet   } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

//Έλεγχος αν ο χρήστης έχει συνδεθεί, με σκοπό να δείξει το περιεχόμενο που ζητείται
const RequireAuth = () => {
  const location = useLocation()
  const { auth } = useAuth()

  return (
    //Αν ο χρήστης έχει συνδεθεί θα του εμφανιστεί το ζητούμενο component, ενώ αν δεν έχει συνδεθεί γίνεται ανακατεύθυνση προς την σελίδα σύνδεσης
    auth?.username ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RequireAuth