const route = require('express').Router()
const DataBase = require('../api/database')
const uploadImage = require('../storageFile')
const deleteImage = require('../helper/deleteImage')

route.get('/check',(req,res,next) => {
    return res.status(200).send()
})

route.get('/allOrders',(req,res,next) => {
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

route.put('/orderStatus',(req,res,next) => {
   const status = req.body.status
   const orderId = req.body.orderId
   DataBase.updateOrderStatus(orderId,status)
   .then(() =>{
       return res.status(200).send('ok')
    })
   .catch((e) => {
     console.log(e)
   })
})

route.post('/uploadCategory',uploadImage,(req,res,next) => {

  const newPath = req.file.path.split('public')[1]
  DataBase.uploadCategory(req.body.categoryName,newPath).then(() =>{
      res.status(200).send('Categoria criada com sucesso')
  }).catch(e =>{
      res.status(500).send('Erro no servidor')
  })
})

route.post('/uploadFood',uploadImage,(req,res,next) => {
    const newPath = req.file.path.split('public')[1]
    
    DataBase.uploadFood(req.body.foodName,"teste",newPath,req.body.foodPrice,req.body.foodCategory)
    .then(() => {
        res.status(200).send('Refeiçao criada com sucesso')
    })
    .catch((e) => {
        console.log(e)
    })
  })

route.put('/updateCategoryName/:id',(req,res,next) => {
    DataBase.updateCategoryName(req.params.id,req.body.categoryName)
    .then(() => {
        return res.status(200).send()
    })
    .catch((e) => {
        console.log(e)
    })
})

route.put('/updateCategoryImage/:id',uploadImage,(req,res,next) => {
    const newPath = req.file.path.split('public')[1]    
    DataBase.getCategoryImagePath(req.params.id)
        .then((result) => {
            deleteImage(result[0].image)
            DataBase.updateCategoryImage(req.params.id,newPath)
            .then(() => {
                return res.status(200).send()
            })
            .catch((e) => {
                console.log(e)
                return res.status(500).send()
            })
        })
        .catch((e) => {
            console.log(e)
            return res.status(500).send()
        })     
})

route.delete('/deleteCategory/:id',(req,res,next) => {
    DataBase.getCategoryImagePath(req.params.id)
    .then((result) => {
        deleteImage(result[0].image)
        DataBase.deleteCategory(req.params.id)
        .then((result) => {
            res.status(200).send()
        })
        .catch((e) => {
            res.status(500).send()
        })
    })
    .catch((e) => {
        res.status(500).send()
    })
})


module.exports = route