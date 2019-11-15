import React,{useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom';
import { mask } from './CpfMask'
import './PurchaseForm.css'
import GoogleLocation from '../googleLocation/GoogleLocation'
 const PurchaseForm = (props) => {
    
    const [selectedMethod,setSelectedMethod] = useState('')
    const [cpfError,setCpfError] = useState('')
    const [inputValue,setInputValue] = useState('')
    const [cpf,setCpf] = useState('')
    const [googleError,setGoogleError] = useState(false)
    
    
    useEffect(() =>{
        if(cpf.length == 14){
            verifyCpf()
        }
    },[cpf])
    
    const handleSelectedMethod = (event) =>{
        setSelectedMethod(event.target.id)
    }

    const handleGoogleError = (error) => {
        setGoogleError(error)
    }

    const handleCpf = (e) => {
        if(cpf.length > 14){
            setCpf(mask.CnpjMask(e.target.value))
        }else{
            setCpf(mask.CpfMask(e.target.value))
        }
            
    }

    const verifyCpf = async () =>{

        let cpfArray = await cpf.split("")

        let cpfComplete = await cpfArray.filter((e) => {
            return e != '.' && e != '-' ? e : ''
        })

        cpfComplete = await cpfComplete.map((e) =>{
            return parseInt(e)
        })
       
        let cpfNumber = await getCpfToCheck(cpfComplete)
        
        const firstDigit = await testDigit( mod11( getSumOfMultiplication( cpfNumber, 10 ) )) 
        const secondDigit = await testDigit( mod11( getSumOfMultiplication( cpfNumber.concat( firstDigit ), 11 ) ) )
         
        if(!isEqual(firstDigit,secondDigit,cpfComplete)){
            setCpfError(true)
            return
        }

        if(isRepeatingNumbers(cpfComplete)){
            setCpfError(true)
            return
        }

        setCpfError(false)
    }

    const getSumOfMultiplication = ( list, total ) => list.reduce( toSumOfMultiplication( total ), 0 )
    
    const getCpfToCheck = ( cpf ) => ( cpf.map ) ? cpf.slice( 0, 9 ) : cpf.substr( 0, 9 ).split( '' )

    const toSumOfMultiplication = ( total ) => ( result, num, i ) => result + ( num * total-- )
    
    const mod11 = ( num ) => num % 11 

    const testDigit = ( num ) =>  ( num < 2 ) ? 0 : 11 - num
   
    const isEqual = (dgt1,dgt2,cpfNumber) => {
        if(cpfNumber[9] == dgt1 && cpfNumber[10] == dgt2){
            console.log('ok')
            return true
        }else{
            console.log('nao')
            return false
        }
    }

    const isRepeatingNumbers = (cpfComplete) =>{
             return cpfComplete.every( ( elem ) => elem === cpfComplete[0] )
    }
       
        


    return(
        <section className='l-purchase'>
            <div className='l-purchase-container'>
                <div className="m-google-input">
                    <h1>Entregar em</h1>
                    <GoogleLocation handleGoogleError={handleGoogleError} googleError={googleError}></GoogleLocation>
                    <p className='error'>{googleError ? googleError : ''}</p>
                </div>
                
                <div className='l-payment-container'>
                        <h1>Pagamento</h1>
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
                </div>
                <div className="l-payment-info">
                    <h1>CPF/CNPJ</h1>
                    <form>
                        <input type="text" maxLength="18"  onChange={(e) =>{handleCpf(e)}} value={cpf}></input>
                        {cpfError == true ? <p>Erro</p> : ''}
                    </form>
                </div>  
            </div>
        </section>
    )
}

export default withRouter(PurchaseForm)
