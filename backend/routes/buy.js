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
          await verifyOrders(order.result.purchase_units[0].items)
      }catch(err){
            return res.send('Pedido invalido').status(400)
      }
        
       return res.send(200);
})

  const verifyOrders = async (orders) => {
            let isValid = true
            let amount = 0
            await asyncForEach(orders, async (order) => {
                await DataBase.getFoodById(parseInt(order.sku))
                      .then(food => {  
                           let price = parseFloat(order.unit_amount.value).toFixed(2)
                           if(food[0].price == price){
                                amount += food[0].price * parseInt(order.quantity) 
                           }else{
                                isValid = false
                           }     
                       })         
             })
             if(!isValid || amount != parseFloat(order.result.purchase_units[0].amount.value).toFixed(2)){
                console.log('passei por aqui')
                throw new Error('Invalid order')
            }
    }
  
  
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
module.exports = route