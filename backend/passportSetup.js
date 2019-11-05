const DataBase = require('./api/database')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const configAuth = require('./config/authConfig')


passport.serializeUser((user,done) => {
    done(null,user.userID)
})

passport.deserializeUser((id,done) => {
    DataBase.findUser(id).then(user =>{
        done(null,user)
    }).catch(e => {
        done(new Error("Failed to deserialize an user"));
      });
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
          console.log(e)
    })
})
)
