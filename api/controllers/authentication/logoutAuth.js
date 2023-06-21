const User = require('../.././models/user');

//Αυθεντικοποίηση κατά την αποσύνδεση ενος χρήστη
const logout = async (req, res) => {
  const cookies = req.cookies;      //Τα cookies που έρχονται με το request αποδίδονται στη μεταβλητή cookies
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;    //Αποθήκευση της τιμής του cookie με όνομα jwt στη μεταβλητή refreshToken

  const foundUser = await User.findOne({ token: refreshToken });
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // Διαγραφή του cookie jwt με ασφάλεια και αποστολή response χωρίς περιεχόμενο
    return res.sendStatus(204);
  }

  //Αν βρεθεί ο χρήστης

  foundUser.token = '';     //Αποσύνδεση του χρήστη μηδενίζοντας το token
  await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //Διαγραφή του cookie jwt και αποστολή response που υποδηλώνει επιτυχή αποσύνδεση
  return res.sendStatus(204);
};

module.exports = logout;
