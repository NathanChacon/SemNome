import React,{Component}from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'

export default class Example extends Component{
  
  constructor(props){
    super(props)
    this.total = 0
    this.items = []
    this.address = this.props.address
    this.addressToVerify = this.props.addressToVerify
  }
  componentDidMount(){  
      this.props.product.forEach((e) =>{
           this.total += e.price * e.quantity
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
           this.items.push(helper)
           console.log(this.items)
  })

}
  
  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                  reference_id: "PUHF",
                  description: "Some description",
  
                  custom_id: "Something7364",
                  soft_descriptor: "Great description 1",
                  amount: {
                      currency_code: "BRL",
                      value: this.total,
                      breakdown: {
                          item_total: {
                              currency_code: "BRL",
                              value: this.total
                          }
                      }
                  },
                  items: this.items,
              }
          ]
      });
        }}

        onInit ={(data, actions) => {
          // Disable the buttons
          actions.disable()

          setInterval(() => {
            if(this.props.errors.googleError.status || this.props.errors.inputError.status){
              actions.disable()
            }else{
              actions.enable()
          }
          },10)
      }
      }

      onClick = {(data,actions) => {
        if(this.props.errors.googleError.status || this.props.errors.inputError.status){
            this.props.handlePaypalAlert()
        }
      }}

        onApprove={(data, actions) => {
         // Authorize the transaction
         actions.order.authorize().then((authorization) => {
              
          // Get the authorization id
         var authorizationID = authorization.purchase_units[0]
          .payments.authorizations[0].id

        const fullAddress = this.address
        const addressToVerify = this.addressToVerify
        const cpfOrCnpj = this.props.inputCpfOrCnpjValue
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
              authorizationID: authorizationID,
              addressToVerify:addressToVerify,
              fullAddress:fullAddress,
              cpfOrCnpj:cpfOrCnpj
            }
          })
          .then(() => {
          })
          .catch((e) => {
            this.props.handlePaypalError()
          })
        });
        }}
      />
    );
  }
}