const DataBase = require('../api/database')

const verifyOrders = async (orders,amount) => {
    console.log('Chamado com sucesso')
    return new Promise((resolve,reject) => {
          let verifyAmount = 0
          asyncForEach(orders, async (order,index) => {
              await DataBase.getFoodById(parseInt(order.sku))
                  .then(food => { 
                      verifyAmount += food[0].price * parseInt(order.quantity)
                    })
                    if(index == orders.length - 1){
                        if(verifyAmount != parseFloat(amount).toFixed(2)){
                            reject(new Error('Nao foi possivel realizar a transação'))
                        }
                        else{
                            resolve()
                        }
                    }              
           })
    })
}

const createOrder = (order,amount,method,userID,userName,address,cpfOrCnpj,date) => {
    return new Promise(async (resolve,reject) => {
      const orderDescription = await mountOrder(order)
      DataBase.uploadOrder(userID,userName,cpfOrCnpj,address,method,orderDescription,amount,0,date).then(e =>{
          resolve()
      }).catch((e) => {
          reject(e)
      })
    })
}

const mountOrder = (order) => {
    return new Promise((resolve,reject) => {
      let verifyIfEnd
      let  description = order.reduce((description,item,index) => {
      verifyIfEnd = index
      if(index === 0){
        return  description + " " + item.quantity + " " + item.name 
      }else{
        return  description + "|" + item.quantity + " " + item.name 
      }  
    },'')
    if(verifyIfEnd == order.length - 1){
       resolve(description)
    }
  })
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


module.exports = {
    verifyOrders,
    createOrder
}