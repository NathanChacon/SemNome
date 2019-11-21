const route = require('express').Router()
const paypal = require('@paypal/checkout-server-sdk');
const paypalConfig = require('../config/paypalConfig')

let clientId = paypalConfig.CLIENT_ID;
let clientSecret = paypalConfig.SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let payPalClient = new paypal.core.PayPalHttpClient(environment);


route.post('/paypal-transaction-complete',async (req,res) => {
    
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

      // 5. Validate the transaction details are as expected
        /*if (order.result.purchase_units[0].amount.value !== '220.00') {
            return res.send(400);
        }*/
       console.log(req.user)
       return res.send(200);
})


module.exports = route