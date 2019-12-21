const route = require('express').Router()
const orderHelper = require('../helper/orderHelper')
const moment = require('moment-timezone')
const DataBase = require('../api/database')

route.post('/', async (req,res) => {
    console.log(req.body)
    const date = moment().tz("America/Sao_Paulo").format('DD/MM/YY HH:mm')
    const userId = req.user.userID
    const userName = req.user.name
    const address = req.body.fullAddress
    try{
        await orderHelper.verifyOrders(req.body.items,req.body.amount)
        await orderHelper.createOrder(req.body.items,req.body.amount,req.body.method,userId,userName,address,req.body.cpfOrCnpj,date)
    }
    catch(e){
        console.log(e)
    }
})

module.exports = route