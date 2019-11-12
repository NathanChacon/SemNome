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
            sum += e.price
        })

        return sum
    }
    return(
        
        <div className={`container-items ${extended ? "is-extended" : "is-normal"}`}>
            <div className="header-items" onClick={() => {handleSize()}}>
                <header>Visualizar Sacola</header>
            </div>
            <div className="m-items">
               <ul>
                {props.selectedItems ? props.selectedItems.map(e =>{
                    return<li>{e.foodName + " " + e.price + " " + e.quantity} <button onClick={() =>{props.removeItem(e.idRemove)}}>Remover</button></li>   
                }):''}
               </ul>
            </div>
            <div className="m-items-total">
                <span>Total:{handleTotal()}</span>
                <Link to={{
                    pathname:'purchase',
                    state: props.selectedItems
                }} className='link'>Confirmar</Link>
            </div>
            
        </div>
    )


}