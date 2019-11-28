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
    console.log(orderID)
    // 3. Call PayPal to get the transaction details
     let request = new paypal.orders.OrdersGetRequest(orderID);

     let order;
     try {
        order = await payPalClient.execute(request);
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
      await DataBase.saveTransaction(orderID)
            .then(() => {console.log('transaction saved with success')})
            .catch(err => res.status(500))

       return res.send(200);
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
module.exports = route