const route = require('express').Router()
const DataBase = require('../api/database')

route.get('/all',(req,res,next) => {
        DataBase.getAllOrders()
        .then((orders) => {
            return res.send({
                orders
            }).status(200)
        })
        .catch((e) => {
          return  res.status(400)
        })
})

route.put('/status',(req,res,next) => {
    const status = req.body.status
    const orderId = req.body.orderId
    DataBase.updateOrderStatus(orderId,status)
    .then(() =>{
      return res.send('ok').status(200)
    })
    .catch((e) => {
      console.log(e)
      console.log('erro no server')
    })
})


module.exports = route