import React,{useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom';
import './PurchaseForm.css'
import GoogleLocation from '../googleLocation/GoogleLocation'
 const PurchaseForm = (props) => {
    
    const [selectedMethod,setSelectedMethod] = useState('')
    const [googleError,setGoogleError] = useState(false)
    const handleSelectedMethod = (event) =>{
        setSelectedMethod(event.target.id)
    }

    const handleGoogleError = (error) => {
        setGoogleError(error)
    }


    return(
        <section className='purchase'>
            <div className='purchase-container'>
                <div className="google-input">
                    <h1>Entregar em</h1>
                    <GoogleLocation handleGoogleError={handleGoogleError} googleError={googleError}></GoogleLocation>
                    <p className='error'>{googleError ? googleError : ''}</p>
                </div>
                
                <div className='payment-container'>
                        <h1>Pagamento</h1>
                        <div className='payment-items'>
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
                </div>  
            </div>
        </section>
    )
}

export default withRouter(PurchaseForm)
