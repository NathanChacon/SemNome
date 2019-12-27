const route = require('express').Router()
const paypal = require('@paypal/checkout-server-sdk');
const paypalConfig = require('../config/paypalConfig')
const orderHelper = require('../helper/orderHelper')
const moment = require('moment-timezone')

let clientId = paypalConfig.CLIENT_ID;
let clientSecret = paypalConfig.SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let payPalClient = new paypal.core.PayPalHttpClient(environment);

const DataBase = require('../api/database')

route.post('/paypal-transaction-complete',async (req,res) => {
    // 2a. Get the order ID from the request body
    const orderID = req.body.orderID;
    const userId = req.user.userID
    const userName = req.user.name
    const address = req.body.fullAddress
    let idToSend
    const date = moment().tz("America/Sao_Paulo").format('DD/MM/YY HH:mm')
    // 3. Call PayPal to get the transaction details
     let request = new paypal.orders.OrdersGetRequest(orderID);

     let order;
     try {
        order = await payPalClient.execute(request);
        console.log(order)
      } catch (err) {
        // 4. Handle any errors from the call
        console.error(err);
        return res.status(500).send();
      }

      try{
          await orderHelper.verifyOrders(order.result.purchase_units[0].items,order.result.purchase_units[0].amount.value)
      }catch(err){
            console.log(err)
            return res.status(400).send('Pedido invalido')
      }
        
      //save transaction orderID
      await DataBase.saveTransaction(orderID,userId,req.body.authorizationID)
            .then(() => {console.log('transaction saved with success')})
            .catch(err => res.status(500))
      
      try{
         await orderHelper.createOrder(order.result.purchase_units[0].items,order.result.purchase_units[0].amount.value,
                                      'online',userId,userName,address,req.body.cpfOrCnpj,date)
        .then(id => {
          idToSend = id
        })                              
      }catch(e){
        return res.status(500).send('Ops! Ocorreu um erro no servidor, por favor tente mais tarde :(')
      }
      
      res.status(200).send({
        orderId: idToSend
      });
      await captureAuthorization(orderID,req.body.authorizationID)
      res.end();
})

 

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


    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    

module.exports = route