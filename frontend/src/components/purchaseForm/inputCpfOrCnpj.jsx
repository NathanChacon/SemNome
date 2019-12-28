import { mask } from './Mask'
import React,{useEffect,useState} from 'react'
export const InputCpfOrCnpj = (props) => {
    
    const [inputValue,setInputValue] = useState('')
    
    useEffect(() =>{
        if(inputValue.length != 14 && inputValue.length != 18){
            props.handleCpfOrCnpjError("",true)
    }
        if(inputValue.length == 14){
            verifyCpf()
        }
        if(inputValue.length == 18){
            verifyCnpj()
        }
    },[inputValue])
    
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
            props.handleCpfOrCnpjError("Por favor, insira um cpf válido",true)
            return
        }

        if(isRepeatingNumbers(cpfComplete)){
            props.handleCpfOrCnpjError("Por favor, insira um cpf válido",true)
            return
        }
        props.handleCpfOrCnpjError("",false)
        props.handleCpfOrCnpjValue(inputValue)   
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
                props.handleCpfOrCnpjError("Por favor, insira um cnpj válido",true)
                return
        }

        if(!isCnpjDigitsEqual(firstDigit,secondDigit,cnpj)){
                props.handleCpfOrCnpjError("Por favor, insira um cnpj válido",true)
                return
        }

        props.handleCpfOrCnpjError("",false)
        props.handleCpfOrCnpjValue(inputValue)     
    }

    const getCnpjTotal = (cnpjValue,mult) => {
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
            <React.Fragment>
                <h1>CPF/CNPJ</h1>
                <form>
                    <input type="text" className="input-purchase" maxLength="18" onChange={(e) =>{handleInput(e)}} value={inputValue}></input>
                </form>
            </React.Fragment>
    )
}