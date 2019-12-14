import React,{useEffect,useState} from 'react'
import './Items.css'
import { Link } from 'react-router-dom'
export const Items = (props) =>{

    const [extended,setExtended] = useState(false)

    const handleSize = () => {
            setExtended(!extended)
    }

    const handleTotal = () =>{
        let sum = 0
        props.selectedItems.map((e,i) => {
            sum += e.price * e.quantity
        })
        return sum
    }
    return(
        
        <div className={`l-container-items ${extended ? "is-extended" : "is-normal"}`}>
            <div className="m-header-items" onClick={() => {handleSize()}}>
                <p>Visualizar Sacola</p>
            </div>
            <div className={`m-items ${extended ? "is-show" : 'is-hidden'}`}>
               <ul>
                {props.selectedItems ? props.selectedItems.map(e =>{
                    return<li>{e.foodName + " " + e.price + " " + e.quantity} <button onClick={() =>{props.removeItem(e.idRemove)}}>Remover</button></li>   
                }):''}
               </ul>
            </div>
            <div className={`m-items-total ${extended ? "is-visible" : 'is-hidden'}`}>
                <span>Total:{handleTotal()}</span>
                <Link to={{
                            pathname:'purchase',
                            state: props.selectedItems
                        }} className={`m-btn-default link ${props.selectedItems[0] ? 'is-link-visible' : 'is-link-hidden'}`}>Confirmar</Link>

            </div>
            
        </div>
    )


}
