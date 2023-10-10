const User = require('../.././models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Αυθεντικοποίηση κατά την εγγραφή ενός χρήστη
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send('Both inputs required!');
      return;
    }

    const oldUser = await User.findOne({ username });    //Αναζήτηση χρήστη με βάση το username
    if (oldUser)    //Αν υπάρχει ήδη χρήστης με αυτό το username
    {  
      res.status(409).send('User Already Exists!');
      return;
    }

    let encryptedPassword = await bcrypt.hash(password, 10);    //Κρυπτογράφηση του password
    const user = await User.create({      //Δημιουργία νέου χρήστη
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );
    user.token = token;
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports = register;