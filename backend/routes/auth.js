const route = require('express').Router()
const passport = require('passport')


route.get('/facebook', passport.authenticate('facebook',{
    scope:['email']
}))

route.get('/facebook/callback',passport.authenticate('facebook'), (req,res) =>{
        res.redirect('http://localhost:3000/menu')
})

route.get('/facebook/success',(req,res) =>{
  
})

route.get('/logout',(req,res) => {
    req.logout()
    res.redirect('http://localhost:3000/')
})

const authCheck = (req, res, next) => {
    if(req.user){
        next()
    }else{
        res.status(400).send()
    }
  };
  
  route.get("/check", authCheck, (req, res) => {
    console.log(req.user)
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      userName: req.user.name,
      manager: req.user.role === 'manager' ? true : false
    });
  });

module.exports = route