
const cookieSession = require("cookie-session");
const express = require('express')
const app = express()
const cors = require('cors')
const dotEnv = require('dotenv')
dotEnv.config()
const passport = require('passport')
const passportSetup = require('./passportSetup')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const category = require('./routes/categoryRoute')
const food = require('./routes/foodRoute')
const auth = require('./routes/auth')
const buy = require('./routes/buy')

const sessionConfig = require('./config/sessionConfig')
const expressSession = require('express-session')

app.use(cors({
   origin:'http://localhost:3000',
   credentials:true
}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(
    cookieSession({
      name: "session",
      keys: [sessionConfig.session.cookieKey],
      maxAge: 24 * 60 * 60 * 100
    })
  );

app.use(cookieParser(sessionConfig.session.cookieKey))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));




app.use('/food',food)
app.use('/category',category)
app.use('/auth',auth)
app.use('/buy',buy)



app.listen(8080,() => {
    console.log('Server rodando')
})

