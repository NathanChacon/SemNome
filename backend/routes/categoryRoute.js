const route = require('express').Router()
const DataBase = require('../api/database')
const storeFile = require('../storageFile')


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

route.post('/uploadCategory',storeFile,(req,res,next) => {
    DataBase.uploadCategory(req.body.categoryName,req.imgPath).then(() =>{
        res.send('Categoria criada com sucesso').status(200)
    }).catch(e =>{
        res.send('Erro no servidor').status(500)
    })
})

module.exports = route