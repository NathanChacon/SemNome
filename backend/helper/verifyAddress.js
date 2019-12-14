const verifyAddress = async (req,res,next) => {
  if(!req.body.addressToVerify){
      return res.status(400).send('Preencha o endereço corretamente')
  }

  const results = req.body.addressToVerify
  
  try{
      await verifyAddressNumber(results[0].address_components[0].types[0])
      await isAdmAreaValid(results[0].address_components[4].long_name)
      await isPoliticalAreaValid(results[0].address_components[2].long_name)
  }catch(e){
      return res.status(400).send(e)
  }
  
  next()
}

isPoliticalAreaValid = element =>{
  return new Promise((resolve,reject) => {
    switch(element){
      case 'Brás de Pina':
      return resolve(true)
      break;

      case 'Vila da Penha':
        return resolve(true)
      break;

      case 'Vicente de Carvalho':
        return resolve(true)
      break;

      case 'Cordovil':
        return resolve(true)
      break;

      case 'Penha Circular':
        return resolve(true)
      break;

      case 'Penha':
        return resolve(true)
      break;

      case 'Olaria':
        return resolve(true)
      break;

      case 'Ramos':
        return resolve(true)
      break;

      default:
        return reject('Não atendemos nessa região :( ')
    }
  })
 
}

isAdmAreaValid = (element) => {
  return new Promise((resolve,reject) => {
    if(element !== "Rio de Janeiro"){
      reject('Não atendemos nessa região')
    }else{
      return resolve(true)
    }
  })
      
}

verifyAddressNumber = (element) => {
  return new Promise((resolve,reject) => {
    if(element !== "street_number"){
      reject('Insira o numero da residência')
    }else{
      resolve(true)
    }
  })
}

module.exports = verifyAddress