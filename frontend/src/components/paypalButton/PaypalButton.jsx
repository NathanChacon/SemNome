import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import { stringify } from 'querystring';

export default function PaypalButton({product,address}) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();


    useEffect(() => {
      let items = []
      let total = 0
      product.forEach((e) =>{
           total += e.price * e.quantity
           let helper = {
             name:e.foodName,
             description:e.foodDescription,
             sku:e.idFood,
             unit_amount:{
               currency_code:"BRL",
               value: e.price
             },
             quantity: e.quantity
           }
           items.push(helper)
      })

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                    reference_id: "PUHF",
                    description: "Some description",
    
                    custom_id: "Something7364",
                    soft_descriptor: "Great description 1",
                    amount: {
                        currency_code: "BRL",
                        value: total,
                        breakdown: {
                            item_total: {
                                currency_code: "BRL",
                                value: total
                            }
                        }
                    },
                    items: items,
                }
            ]
        });
          },
          onApprove: function(data, actions) {

            // Authorize the transaction
            actions.order.authorize().then(function(authorization) {
              
              // Get the authorization id
             var authorizationID = authorization.purchase_units[0]
              .payments.authorizations[0].id

              //call Server
              axios({
                method:'POST',
                withCredentials:true,
                url:'http://localhost:8080/buy/paypal-transaction-complete',
                headers:{
                  'Content-Type': 'application/json'
                },
                data:{
                  orderID: data.orderID,
                  authorizationID: authorizationID
                }
              })
              .then(_ => {console.log('succes')})
              .catch(e => {console.log(e)})
            });
          },
          onError: err => {
            setError(err);
            console.log('Um erro aconteceu')
            console.error(err);
          },
          locale:'pt_BR',
          style: {
            size: 'small',
            color: 'gold',
            shape: 'pill',
          }
        })
        .render(paypalRef.current);
    }, [product.foodName, product.price]);

    
      return (
        <div>
          {error && <div>Uh oh, an error occurred! {error.message}</div>}
            <div ref={paypalRef} />
            {console.log(paypalRef)}
        </div>
      );
    }