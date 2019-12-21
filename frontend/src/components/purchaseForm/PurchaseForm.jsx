import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { withRouter,Redirect} from 'react-router-dom';
import PaypalButton from '../paypalButton/PaypalButton'
import './PurchaseForm.css'
import GoogleLocation from '../googleLocation/GoogleLocation'
import {InputCpfOrCnpj} from './inputCpfOrCnpj'

 const PurchaseForm = (props) => {
    const [errors,setErrors] = useState({
        googleError:{
            msg:"",
            status:true
        },
        inputError:{
            msg:"",
            status:true
        },
        methodError:{
            msg:"",
            status:true
        }
    })
    const methodsNames = ['Dinheiro','Débito-Visa','Crédito-American Exp','Crédito-Mastercard','Crédito-Goodcard','Vale-Sodexo','Vale-VrRefeição','DébitoElo']
    const [address,setAddress] = useState('')
    const[addressToVerify,setAddressToVerify] = useState('')
    const [inputCpfOrCnpjValue,setInputOrCnpjValue] = useState('')
    const [selectedMethod,setSelectedMethod] = useState('')
    const [errorAlert,setErrorAlert] = useState(false)
    const [delivery,setDelivery] = useState(true)
    const [online,setOnline] = useState(false)


    
    useEffect(() => {
        props.verifyToken()
    },[])

    const handleSelectedMethod = (name) =>{
        setSelectedMethod(name)
    }

    const handleGoogleError = (error,isCorrect) => {
        if(!isCorrect){
            setErrors({
                ...errors,
                googleError:{
                    msg:error,
                    status:true
                }
            })
        }else{
            setErrors({
                ...errors,
                googleError:{
                    msg:"",
                    status:false
                }
            })
        }
    }

    const handleAddress = (address,results) => {
        setAddress(address)
        setAddressToVerify(results)
    }



    const handleCpfOrCnpjError = (msg,status) => {
        setErrors({
            ...errors,
            inputError:{
                msg:msg,
                status:status
            }
        })
    }

    const handleCpfOrCnpjValue = (value) => {
        setInputOrCnpjValue(value)
    }

    const handleErrorAlert = () => {
        setErrorAlert(!errorAlert)
    }

    const handleSendOrder = () => {
            if(errors.googleError.status || errors.inputError.status || !selectedMethod){
                handleErrorAlert()
            }
            else{
                let total = 0
                let items = []
               props.location.state.forEach((e) =>{
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
         
                axios({
                    method:'POST',
                    withCredentials:true,
                    url:'http://localhost:8080/buy/delivery/',
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    data:{
                        addressToVerify:addressToVerify,
                        fullAddress:address,
                        cpfOrCnpj:inputCpfOrCnpjValue,
                        items: items,
                        amount: total,
                        method: selectedMethod
                      }
                })
            }
    }
       
    return(
        
        <section className='l-purchase'>
            {!props.isLogged ? <Redirect to='/login'></Redirect> : <div className='l-purchase-container'>
                <div className="m-google-input">
                    <h1>Entregar em</h1>
                    <GoogleLocation handleGoogleError={handleGoogleError} handleAddress = {handleAddress}></GoogleLocation>
                    <p className='error'>{errors.googleError.status ? errors.googleError.msg : ''}</p>
                </div>
                
                <div className='l-payment-container'>
                       <div className='m-payment-options'>
                        <button onClick = {() => {
                                setDelivery(true)
                                setOnline(false)
                            }}>
                                Pagar Na Entrega
                            </button>
                            <button onClick = {() => {
                                setDelivery(false)
                                setOnline(true)
                            }}>
                                Pagar Online
                            </button>
                        </div> 
                       
                        {delivery ? 
                            <div className='m-payment-items'>
                                {methodsNames.map((name) => {
                                return <button id={name} className={`methods ${selectedMethod == name ? "is-method-selected" :''}`}
                                       onClick={(e) => {handleSelectedMethod(name)}}>
                                            {name}
                                        </button>
                                })}
                            </div>  
                             :<PaypalButton
                              product = {props.location.state} 
                              address={address}
                              addressToVerify = {addressToVerify} 
                              errors = {errors} 
                              inputCpfOrCnpjValue ={inputCpfOrCnpjValue}
                              handleErrorAlert = {handleErrorAlert}
                              >
                              </PaypalButton>}
                </div>
                <div className="l-payment-info">
                            <InputCpfOrCnpj handleCpfOrCnpjError = {handleCpfOrCnpjError}  handleCpfOrCnpjValue = {handleCpfOrCnpjValue}></InputCpfOrCnpj>
                            {<p className='error'>{errors.inputError.status ? errors.inputError.msg : ''}</p>}
                </div>
                {delivery ?<button className="m-btn-default" onClick={() => {handleSendOrder()}}>Fazer Pedido</button>: '' }  
                
            </div>
       }
            <div className={`m-error-alert ${errorAlert ? "is-alert-visible" :"is-alert-hidden"}`}>
                <div className="m-error-card">
                    <h3>Atenção</h3>
                    <p>Você deve preencher todas as informações para prosseguir</p>
                    <button className="m-btn-default" onClick={() =>{handleErrorAlert()}}>Entendido</button>
                </div>
            </div>
    </section>    
    )
}

export default withRouter(PurchaseForm)
