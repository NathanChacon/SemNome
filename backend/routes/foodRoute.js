const route = require('express').Router()
const DataBase = require('../api/database')
const storeFile = require('../storageFile')

route.post("/uploadFood",storeFile,async (req,res,next) => {
        
        console.log(req.imgPath)

        const price = await parseFloat(req.body.price)
        const idcat = await parseInt(req.body.idcat)

        DataBase.uploadFood(req.body.foodName,req.body.foodDescription,req.imgPath,price,idcat).then(() =>{
            res.status(200).send('Comida criada com sucesso')
        }).catch(e =>{
            console.log(e)
            res.status(500).send('Erro no servidor')
        })
})



route.get('/:id',(req,res,nex) => {
         DataBase.getFoodByCategoryId(req.params.id).then((food) =>{
                res.json({
                    food
                })
         }).catch((e) => {
             res.status(500).send('Erro ao consultar banco de dados')
         })
})




module.exports = route