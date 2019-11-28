import React,{useState} from 'react'
import './ConfirmItens.css'
export const ConfirmItens = (props) =>{
        
    const [quantity,setQuantity] = useState(1)
    
    const handleQuantity = (method) =>{
        if(method === 'increase'){
            setQuantity(quantity + 1)
        }else{
            if(quantity != 1){
                setQuantity(quantity - 1)
            }else{
                return
            }  
        }
    }

 
    
    return(
            <div className = {`l-container-confirm ${props.confirmItem ?' is-confirm-visible':' is-confirm-hidden'}`}>
            <div className='m-confirm'>
                  {props.confirmItem ?
                  <ul>
                      <li>{props.confirmItem.foodName}</li>
                  <li>{'R$' + props.handlePrice(props.confirmItem.price,quantity)}</li>
                      <li>
                          Quantidade:      
                           <button className="btn-quantity" onClick={() =>{handleQuantity('decrase')}}> - </button>
                           {quantity}
                           <button className="btn-quantity" onClick={() =>{handleQuantity('increase')}}> + </button>
                       </li>
                      <button className="m-btn-default comfirmItems" onClick={() =>{props.addItens(props.confirmItem,quantity)}}>Adicionar</button>
                  </ul>
                  :''}
            </div>  
       </div>

        )
}