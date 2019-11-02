
const express = require('express')
const app = express()
const cors = require('cors')
const dotEnv = require('dotenv')
dotEnv.config()
const passport = require('passport')
const bodyParser = require('body-parser')
const category = require('./routes/categoryRoute')
const food = require('./routes/foodRoute')
const auth = require('./routes/auth')
const sessionConfig = require('./config/sessionConfig')
const cookieSession = require('cookie-session')


app.use(cookieSession({
    name:'userSession',
    maxAge:48*60*60*1000,
    keys:[sessionConfig.session.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/food',food)
app.use('/category',category)
app.use('/auth',auth)


app.listen(8080,() => {
    console.log('Server rodando')
})


