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

module.exports = route