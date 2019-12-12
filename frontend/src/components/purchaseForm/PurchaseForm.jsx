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
    const [address,setAddress] = useState('')
    const[addressToVerify,setAddressToVerify] = useState('')
    const [inputCpfOrCnpjValue,setInputOrCnpjValue] = useState('')
    const [selectedMethod,setSelectedMethod] = useState('')
    const [paypalErrorAlert,setPaypalErrorAlert] = useState(false)
    const [delivery,setDelivery] = useState(true)
    const [online,setOnline] = useState(false)


    
    useEffect(() => {
        props.verifyToken()
        if(!props.location.state[0]){
           props.history.push('/menu')
        }
    },[])

    const handleSelectedMethod = (event) =>{
        setSelectedMethod(event.target.id)
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

    const handlePaypalAlert = () => {
        setPaypalErrorAlert(!paypalErrorAlert)
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

    const handleSendOrder = () => {
            if(errors.googleError.status || errors.inputError.status || !selectedMethod){
                //todo adicionar erro ao botão fazer pedido
                console.log('preencha as informações corretamente')
            }else{

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
                            <button 
                            onClick={(event) => {handleSelectedMethod(event)}} 
                            className={`methods ${selectedMethod == 'MasterCard' ? "is-method-selected" :''}`}
                            id="MasterCard"
                            >
                                MasterCard
                            </button>
                            <button className='methods' 
                            onClick={(event) => {handleSelectedMethod(event)}} 
                            className={`methods ${selectedMethod == 'Visa' ? "is-method-selected" :''}`}
                            id="Visa">
                                Visa
                            </button>
                            <button className='methods' id="CredCard">
                                CredCard
                            </button>
                            <button className='methods' id="ValeRefeicao">
                                Vale Refeição
                            </button>
                        </div>  
                             :<PaypalButton product = {props.location.state} address={address} addressToVerify = {addressToVerify} errors = {errors} handlePaypalAlert = {handlePaypalAlert} inputCpfOrCnpjValue ={inputCpfOrCnpjValue}></PaypalButton>}
                </div>
                <div className="l-payment-info">
                            <InputCpfOrCnpj handleCpfOrCnpjError = {handleCpfOrCnpjError}  handleCpfOrCnpjValue = {handleCpfOrCnpjValue}></InputCpfOrCnpj>
                            {<p className='error'>{errors.inputError.status ? errors.inputError.msg : ''}</p>}
                </div>  
                <button className="m-btn-default" onClick={() => {handleSendOrder()}}>Fazer Pedido</button>
            </div>
       }
            <div className={`l-paypal-alert ${paypalErrorAlert? "is-alert-visible" :"is-alert-hidden"}`}>
                  <div className="m-paypal-alert-card">
                        <h3>Atenção</h3>
                        <p>Você deve preencher todas as informações para prosseguir</p>
                        <button className="m-btn-default" onClick={() =>{handlePaypalAlert()}}>Entendido</button>
                  </div>   
            </div>
    </section>    
    )
}

export default withRouter(PurchaseForm)
