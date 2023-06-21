import { createContext, useState } from 'react'

//Στο AuthContext θα βρίσκονται αποθηκευμένες οι πληροφορίες εξουσιοδότησης
const AuthContext = createContext({})

//Ο AuthProvider είναι ο πάροχος των πληροφοριών εξουσιοδότησης
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})   //Για ενημέρωση ή ανάκτηση των πληροφοριών εξουσιοδότησης

  return (
    //Ο AuthProvider θα παρέχει πληροφορίες εξουσιοδότησης στα children, δηλαδή
    //στα components που θα εμπεριέχονται σε αυτόν
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}    
    </AuthContext.Provider>
  )
}

export default AuthContext