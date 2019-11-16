import React,{useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom';
import { mask } from './Mask'
import './PurchaseForm.css'
import GoogleLocation from '../googleLocation/GoogleLocation'
 const PurchaseForm = (props) => {
    
    const [selectedMethod,setSelectedMethod] = useState('')
    const [inputError,setInputError] = useState('')
    const [inputValue,setInputValue] = useState('')
    const [googleError,setGoogleError] = useState(false)
    
    
    useEffect(() =>{
        if(inputValue.length == 14){
            verifyCpf()
        }

        if(inputValue.length == 18){
            verifyCnpj()
        }

    },[inputValue])
    
    const handleSelectedMethod = (event) =>{
        setSelectedMethod(event.target.id)
    }

    const handleGoogleError = (error) => {
        setGoogleError(error)
    }

    const handleInput = (e) => {
        if(inputValue.length > 14){
            setInputValue(mask.CnpjMask(e.target.value))
        }else{
            setInputValue(mask.CpfMask(e.target.value))
        }          
    }

    const verifyCpf = async () =>{

        let cpfArray = await inputValue.split("")

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
            setInputError(true)
            return
        }else{
            console.log('ok')
        }

        if(isRepeatingNumbers(cpfComplete)){
            setInputError(true)
            return
        }

        setInputError(false)
    }

    const verifyCnpj = async () => {

        let cnpj = await inputValue.split('')
        
         cnpj = await cnpj.filter(e => {
                return !isNaN(e) ? e : ''
        })

        cnpj = await cnpj.map(e => {
            return parseInt(e)
        })

        let cnpjNumbers = cnpj.slice(0,12)

        let firstDigit = (testDigit(mod11(getCnpjTotal(cnpjNumbers,5))))
        let secondDigit = (testDigit(mod11(getCnpjTotal(cnpjNumbers.concat(firstDigit),6))))

        if(isRepeatingNumbers(cnpj)){
            console.log('cnpj invalido')
        }

        if(isCnpjDigitsEqual(firstDigit,secondDigit,cnpj)){
            console.log('cnpj valido')
        }else{
            console.log('cnpj invalido')
        }
             
    }

    const getCnpjTotal =  (cnpjValue,mult) => {
        let sum = 0
         cnpjValue.forEach(value => {
            sum += value*mult
            --mult
            if(mult < 2){
                mult = 9
            }
        })
        return sum
    }

    const isCnpjDigitsEqual = (dgt1,dgt2,cnpjValue) => {
        if(cnpjValue[12] == dgt1 && cnpjValue[13] == dgt2){
            return true
        }else{
            return false
        }
    }

    const getSumOfMultiplication = ( list, total ) => list.reduce( toSumOfMultiplication( total ), 0 )
    
    const getCpfToCheck = ( cpf ) => ( cpf.map ) ? cpf.slice( 0, 9 ) : cpf.substr( 0, 9 ).split( '' )

    const toSumOfMultiplication = ( total ) => ( result, num, i ) => result + ( num * total-- )
    
    const mod11 = ( num ) => num % 11 

    const testDigit = ( num ) =>  ( num < 2 ) ? 0 : 11 - num
   
    const isEqual = (dgt1,dgt2,value) => {
        if(value[9] == dgt1 && value[10] == dgt2){
            return true
        }else{
            return false
        }
    }

    const isRepeatingNumbers = (value) =>{
             return value.every( ( elem ) => elem === value[0] )
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
                        <input type="text" maxLength="18"  onChange={(e) =>{handleInput(e)}} value={inputValue}></input>
                        {inputError == true ? <p>Erro</p> : ''}
                    </form>
                </div>  
            </div>
        </section>
    )
}

export default withRouter(PurchaseForm)