function verifyCpfOrCnpj(req,res,next){
    if(!req.body.cpfOrCnpj){
        return res.status(400).send('Por favor preencha as informações de cpf ou cnpj corretamente')
    }

    const cpfOrCnpj = req.body.cpfOrCnpj
    
    if(cpfOrCnpj.length != 14 && cpfOrCnpj.length != 18){
        return res.status(400).send('Por favor preencha as informações de cpf ou cnpj corretamente')
    }

    if(cpfOrCnpj.length == 14){
        verifyCpf(cpfOrCnpj)
        .then(() =>{
            next()
        })
        .catch(() => {
            return res.status(400).send('Por favor preencha as informações de cpf ou cnpj corretamente')
        })
    }
    if(cpfOrCnpj.length == 18){
        verifyCnpj(cpfOrCnpj)
        .then(() => {
            next()
        })
        .catch(() => {
            return res.status(400).send('Por favor preencha as informações de cpf ou cnpj corretamente')
        })
    }
}

const verifyCpf = (cpf) =>{
    return new Promise(async (resolve,reject) => {
        let cpfArray = await cpf.split("")

        let cpfComplete = await cpfArray.filter((e) => {
            return e != '.' && e != '-' ? e : ''
        })
        cpfComplete = await cpfComplete.map((e) =>{
            return parseInt(e)
        })
       
        let cpfNumber = await getCpfToCheck(cpfComplete)
        
        const firstDigit = await testDigit(mod11( getSumOfMultiplication( cpfNumber, 10 ))) 
        const secondDigit = await testDigit( mod11( getSumOfMultiplication( cpfNumber.concat( firstDigit ), 11 )))
         
        if(!isEqual(firstDigit,secondDigit,cpfComplete)){
            reject() 
        }
        if(isRepeatingNumbers(cpfComplete)){
           reject()
        }
        resolve()
    })
}

const verifyCnpj = (cnpj) => {
    return new Promise(async (resolve,reject) => {
        let cnpjArray = await cnpj.split('')
    
        cnpjArray = await cnpjArray.filter(e => {
               return !isNaN(e) ? e : ''
       })
   
       cnpjArray = await cnpjArray.map(e => {
           return parseInt(e)
       })
   
       let cnpjNumbers = cnpjArray.slice(0,12)
   
       let firstDigit = (testDigit(mod11(getCnpjTotal(cnpjNumbers,5))))
       let secondDigit = (testDigit(mod11(getCnpjTotal(cnpjNumbers.concat(firstDigit),6))))

       if(isRepeatingNumbers(cnpjArray)){
               reject()
       }
   
       if(isCnpjDigitsEqual(firstDigit,secondDigit,cnpjArray)){
               reject()
       }
       
       resolve()
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

module.exports = verifyCpfOrCnpj