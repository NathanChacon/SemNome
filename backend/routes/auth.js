const route = require('express').Router()
const DataBase = require('../api/database')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const configAuth = require('../config/authConfig')


passport.serializeUser((user,done) => {
    done(null,user.userID)
})

passport.deserializeUser((id,done) => {
    DataBase.findUser(id).then(user =>{
         done(null,user.userID)
    })
})

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
    callbackURL: "/auth/facebook/callback"
  },function(token, refreshToken, profile, done) {
        DataBase.findUser(profile._json.id).then((user) =>{
              if(user){
                  console.log('usuario ja registrado')
                  done(null,user)
              }else{
                 DataBase.createUser(profile._json.id,profile._json.name,profile._json.email).then( _ =>{
                      DataBase.findUser(profile._json.id).then(user => {
                           done(null,user)
                      })  //MySql dont support returning statement
                 }).catch(e => {
                   console.log(e)
                 })
              }
    }).catch(e => {
          console.log('erro')
    })
})
)

route.get('/facebook', passport.authenticate('facebook',{
    scope:['email']
}))

route.get('/facebook/callback',passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/menu',
                                    failureRedirect: '/login'}))

module.exports = route