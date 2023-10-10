const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../.././models/user');

//Αυθεντικοποίηση κατά την σύνδεση ενός χρήστη
const login = async (req, res) => {
  try {
    const username = req.body.username;   //Τα username και password που εισάγει ο χρήστης αποδίδονται σε κατάλληλες μεταβλητές
    const password = req.body.password;
    if (!(username && password)) {
      res.status(400).send('Both inputs required!');
      return;
    }
    
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password)))   //Έλεγχος εγκυρότητας του password που εισάγει ο χρήστης
    { 
      const token = jwt.sign      //Δημιουργία token
      (     
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' }
      );
      user.token = token;
      await user.save();
      
      //Δημιουργία cookie
      res.cookie('jwt', token, {
        httpOnly: true,     //Το cookie είναι προσβάσιμο μόνο μέσω HTTP
        secure: true,       //Το cookie αποστέλλεται μόνο μέσω ασφαλούς σύνδεσης (HTTPS)
        sameSite: 'None',  //Το cookie αποστέλλεται ακόμη και από διαφορετικό domain
        maxAge: 24 * 60 * 60 * 1000,  //Ορισμός της διάρκειας ζωής του cookie σε 24 ώρες
      });

      res.status(200).json(user);  //Επιστρέφονται τα δεδομένα του χρήστη
    } else {
      res.status(400).send('User Not Found!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports = login;