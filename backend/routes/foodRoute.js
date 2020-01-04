const route = require('express').Router()
const DataBase = require('../api/database')
const storeFile = require('../storageFile')

route.get('/byCategory/:id',(req,res,nex) => {
         DataBase.getFoodByCategoryId(req.params.id).then((food) =>{
               res.status(200).send({
                   food
               })
         }).catch((e) => {
             res.status(500).send('Erro ao consultar banco de dados')
         })
})




module.exports = route