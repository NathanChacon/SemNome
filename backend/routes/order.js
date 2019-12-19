const route = require('express').Router()
const DataBase = require('../api/database')

route.get('/all',(req,res,next) => {
        DataBase.getAllOrders()
        .then((orders) => {
            return res.status(200).send({
                orders
            })
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
      return res.status(200).send('ok')
    })
    .catch((e) => {
      console.log(e)
      console.log('erro no server')
    })
})


module.exports = route