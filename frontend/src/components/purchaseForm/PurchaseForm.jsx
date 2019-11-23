import React,{useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom';
import { mask } from './Mask'
import PaypalButton from '../paypalButton/PaypalButton'
import './PurchaseForm.css'
import GoogleLocation from '../googleLocation/GoogleLocation'
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
        },
    })
    const [selectedMethod,setSelectedMethod] = useState('')
    const [inputValue,setInputValue] = useState('')

    
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
            setErrors({
                ...errors,
                inputError:{
                    msg:"Por favor, insira um cpf válido",
                    status:true
                }
            })
            return
        }

        if(isRepeatingNumbers(cpfComplete)){
            setErrors({
                ...errors,
                inputError:{
                    msg:"Por favor, insira um cpf válido",
                    status:true
                }
            })
            return
        }

        setErrors({
            ...errors,
            inputError:{
                msg:"",
                status:false
            }
        })
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
            setErrors({
                    ...errors,
                    inputError:{
                        msg:"Por favor, insira um cnpj válido",
                        status:true
                    }
                })
                return
        }

        if(isCnpjDigitsEqual(firstDigit,secondDigit,cnpj)){
                setErrors({
                    ...errors,
                    inputError:{
                        msg:"Por favor, insira um cnpj válido",
                        status:true
                    }
                })
                return
        }

        setErrors({
            ...errors,
            inputError:{
                msg:"",
                status:false
            }
        })
             
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

    const handleSendOrder = () => {
            
            if(errors.googleError.status || errors.inputError.status || !selectedMethod){
                console.log('preencha as informações corretamente')
            }

    }
       
        


    return(
        <section className='l-purchase'>
            <div className='l-purchase-container'>
                <div className="m-google-input">
                    <h1>Entregar em</h1>
                    <GoogleLocation handleGoogleError={handleGoogleError}></GoogleLocation>
                    <p className='error'>{errors.googleError.status ? errors.googleError.msg : ''}</p>
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
                            <PaypalButton product = {props.location.state}></PaypalButton>
                        </div>
                </div>
                <div className="l-payment-info">
                    <h1>CPF/CNPJ</h1>
                    <form>
                        <input type="text" maxLength="18"  onChange={(e) =>{handleInput(e)}} value={inputValue}></input>
                        {<p className='error'>{errors.inputError.status ? errors.inputError.msg : ''}</p>}
                    </form>
                </div>  
                <button className="m-btn-default" onClick={() => {handleSendOrder()}}>Fazer Pedido</button>
            </div>
        </section>
    )
}

export default withRouter(PurchaseForm)