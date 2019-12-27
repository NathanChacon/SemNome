const route = require('express').Router()
const orderHelper = require('../helper/orderHelper')
const moment = require('moment-timezone')
const DataBase = require('../api/database')

route.post('/', async (req,res) => {
    const date = moment().tz("America/Sao_Paulo").format('DD/MM/YY HH:mm')
    const userId = req.user.userID
    const userName = req.user.name
    const address = req.body.fullAddress
    let idToSend
    try{
        await orderHelper.verifyOrders(req.body.items,req.body.amount)
        await orderHelper.createOrder(req.body.items,req.body.amount,req.body.method,userId,userName,address,req.body.cpfOrCnpj,date)
        .then(id => {
            idToSend = id
        })
    }
    catch(e){
        console.log(e)
    }

    res.status(200).send({
        orderId: idToSend
    })
})

module.exports = route