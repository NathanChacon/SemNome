const route = require('express').Router()
const DataBase = require('../api/database')
const storeFile = require('../storageFile')

route.post("/uploadFood",storeFile,async (req,res,next) => {
        
        console.log(req.imgPath)

        const price = await parseFloat(req.body.price)
        const idcat = await parseInt(req.body.idcat)

        DataBase.uploadFood(req.body.foodName,req.body.foodDescription,req.imgPath,price,idcat).then(() =>{
            res.send('Comida criada com sucesso').status(200)
        }).catch(e =>{
            console.log(e)
            res.send('Erro no servidor').status(500)
        })
})



route.get('/:id',(req,res,nex) => {
         DataBase.getFoodById(req.params.id).then((food) =>{
                res.json({
                    food
                })
         }).catch((e) => {
             res.status(500).send('Erro ao consultar banco de dados')
         })
})




module.exports = route