const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const auth = require('./middleware/authorization')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const register = require('./controllers/authentication/registerAuth')
const login = require('./controllers/authentication/loginAuth')
const logout = require('./controllers/authentication/logoutAuth')
require('dotenv').config()
const currencyRoutes = require('./routes/routes')
const app = express()
const port = 5000


app.use(credentials)
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', currencyRoutes)

app.post('/register', register)
app.post('/login', login)
app.get('/logout', logout)
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ')
  })


//------------------Σύνδεση με MongoDB---------------------------
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo err", err));
//-------------------------------------------------------------------------

app.listen(port, () =>
  console.log(`\nServer is listening on port: ${port}`),
)