import React from 'react'

export const ConfirmItens = (props) =>{
        return(
            <div className = {`container-confirm ${props.confirmItem ?' is-confirm-visible':' is-confirm-hidden'}`}>
            <div className='m-confirm'>
                  {props.confirmItem ?
                  <ul>
                      <li>{props.confirmItem.foodName}</li>
                  <li>{props.handlePrice(props.confirmItem.price)}</li>
                      <li>
                          Quantidade: 
                          <button onClick={() =>{props.handleQuantity('decrase')}}>-</button>
                           {props.quantity}
                           <button onClick={() =>{props.handleQuantity('increase')}}>+</button>
                       </li>
                      <button onClick={() =>{props.addItens(props.confirmItem)}}>Adicionar</button>
                  </ul>
                  :''}
            </div>  
       </div>

        )
}