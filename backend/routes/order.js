const route = require('express').Router()
const DataBase = require('../api/database')

route.get('/allClientOrders',(req,res,next) => {
      DataBase.getOrdersByClientId(req.user.userID)
      .then((orders) => {
        res.status(200).send(
          {
            orders
          }
        )
      })
      .catch((e) => {
         res.status(500).send()
      })
})

route.get('/track/:orderId',(req,res,next) => {
    DataBase.getClientOrderToTrack(req.user.userID,req.params.orderId)
    .then((orderStatus) => {
      res.status(200).send(
        {
         orderStatus
        }
      )
    })
    .catch(e => {
      console.log(e)
    })
})

module.exports = route