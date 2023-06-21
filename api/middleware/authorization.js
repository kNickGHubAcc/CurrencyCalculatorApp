const jwt = require('jsonwebtoken')
const config = process.env    //Επιτυγχάνεται πρόσβαση στο 'TOKEN_ΚΕΥ' που απαιτείται για την επαλήθευση του token

//Ελέγχει την εγκυρότητα του token
const verifyToken = async (req, res, next) => {
  const cookies = req.cookies
  if (!cookies?.jwt) 
    return res.sendStatus(401)
  const token = cookies.jwt    //To token από τα cookies του request αποδίδεται στην μεταβλητή token
  if (!token) {           //Αν δεν υπάρχει token 
    return res.status(403).send('A token is required for authorization')
  }

//Αν τελικώς ληφθεί επιτυχώς το token από τα cookies

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY)  //Επαλήθευση της εγκυρότητας και αποκωδικοποίηση του token
    req.user = decoded    //Αποθήκευση του αποκωδικοποιημένου token στο request, για μελλοντική χρήση 
  } catch (err) {       //Αν η αποκωδικοποίηση του token αποτύχει
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })    //Διαγραφή του cookie 
    return res.status(401).send('Authorization Token Has Expired!')
  }
  return next()
}

module.exports = verifyToken