const User = require('../models/user')

//Λειτουργία που είναι υπεύθυνη για τον χειρισμό ενός request ανανέωσης του token
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) 
    return res.sendStatus(401)
  const refreshToken = cookies.jwt   //To token από τα cookies του request αποδίδεται στην μεταβλητή refreshToken

  const foundUser = await User.findOne({ token: refreshToken })   //Αναζήτηση στη βάση για χρήστη που έχει ίδιο token με το ληφθέν
  if (!foundUser) 
    return res.sendStatus(403)
  else    //Αν βρεθεί χρήστης με ίδιο token επιστρέφεται το object χρήστη
    return res.send(foundUser)   
}

module.exports = { handleRefreshToken }