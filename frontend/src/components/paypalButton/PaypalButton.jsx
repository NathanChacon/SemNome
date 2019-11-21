import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'

export default function PaypalButton({ product }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    
    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.foodName,
                  amount: {
                    currency_code: 'BRL',
                    value: product.price,
                  },
                },
              ],
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
            });
          },
          onError: err => {
            setError(err);
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
    
    if (paidFor) {
        return (
          <div>
            <h1>Parabens voce comprou {product.foodName}!</h1>
          </div>
        );
      }
    
      return (
        <div>
          {error && <div>Uh oh, an error occurred! {error.message}</div>}
          <h1>
            {product.foodName} for ${product.price}
          </h1>
          <div ref={paypalRef} />
        </div>
      );
    }