const route = require('express').Router()
const DataBase = require('../api/database')
const upload = require('../storageFile')

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
     console.log('erro no server')
   })
})

route.post('/uploadCategory',upload,(req,res,next) => {
  console.log(req.file.path)
  console.log(req.body.categoryName)
  const newPath = req.file.path.split('public')[1]
  DataBase.uploadCategory(req.body.categoryName,newPath).then(() =>{
      res.status(200).send('Categoria criada com sucesso')
  }).catch(e =>{
      res.status(500).send('Erro no servidor')
  })
})


module.exports = route