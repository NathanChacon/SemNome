const route = require('express').Router()
const paypal = require('@paypal/checkout-server-sdk');
const paypalConfig = require('../config/paypalConfig')

let clientId = paypalConfig.CLIENT_ID;
let clientSecret = paypalConfig.SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let payPalClient = new paypal.core.PayPalHttpClient(environment);

const DataBase = require('../api/database')

route.post('/paypal-transaction-complete',async (req,res) => {
    console.log(req.body)
    // 2a. Get the order ID from the request body
    const orderID = req.body.orderID;
    const userId = req.user.userID
    const userName = req.user.name
    const address = req.body.address
    
    console.log(orderID)
    // 3. Call PayPal to get the transaction details
     let request = new paypal.orders.OrdersGetRequest(orderID);

     let order;
     try {
        order = await payPalClient.execute(request);
        console.log(order)
      } catch (err) {
        // 4. Handle any errors from the call
        console.error(err);
        return res.send(500);
      }

      try{
          await verifyOrders(order.result.purchase_units[0].items,order.result.purchase_units[0].amount.value)
      }catch(err){
            console.log(err)
            return res.send('Pedido invalido').status(400)
      }
        
      //save transaction orderID
      await DataBase.saveTransaction(orderID,userId,req.body.authorizationID)
            .then(() => {console.log('transaction saved with success')})
            .catch(err => res.status(500))
      
      await createOrder(order,userId,userName,address)

       res.send(200);

      await captureAuthorization(orderID,req.body.authorizationID)
        
       res.end();
})

  const verifyOrders = async (orders,amount) => {
            
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
                            }else{
                                resolve()
                            }
                        }              
               })
        })
  }

  
  async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

      async function captureAuthorization(orderId,authorization) {
        
        console.log('capture foi chamado')
        console.log(authorization)
        // 2. Get the authorization ID from your database
        const authorizationID = authorization
      
       // 3. Call PayPal to capture the authorization
        const request = new paypal.payments.AuthorizationsCaptureRequest(authorizationID);
        request.requestBody({});

        try {
          const capture = await payPalClient.execute(request);
          console.log(capture)
          // 4. Save the capture ID to your database for future reference.
          const captureID = capture.result.id

          await DataBase.saveCaptureID(captureID,orderId);

          return
        } catch (err) {
          // 5. Handle any errors from the call
          console.error(err);
        }
    }

createOrder = async (order,userID,userName,address) => {
    const amount = order.result.purchase_units[0].amount.value
    const orderDescription = await mountOrder(order)
    const method = 'online'

}


mountOrder = (order) => {
    return new Promise((resolve,reject) => {
      let verifyIfEnd
      let  description = order.result.purchase_units[0].items.reduce((description,item,index) => {
        verifyIfEnd = index
        return description + "|" + item.quantity + " " + item.name

    },'')

    if(verifyIfEnd == order.result.purchase_units[0].items.length - 1){
       resolve(description)
    }
  })
    
}
    

module.exports = route