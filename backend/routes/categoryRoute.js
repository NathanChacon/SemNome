const route = require('express').Router()
const DataBase = require('../api/database')

route.get('/all',(req,res,next) =>{
    DataBase.getCategorys().then((i) =>{
        res.json({
            categories: i
        })
    }).catch((e) =>{
        console.log(e)
        res.status(500).send('erro ao consulta banco de dados')
    })
})

module.exports = route