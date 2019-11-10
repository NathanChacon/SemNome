import React,{useEffect,useState} from 'react'
import './Itens.css'

export const Itens = (props) =>{
    const [extended,setExtended] = useState(false)
    const handleSize = () => {
            setExtended(!extended)
    }

    const handleTotal = () =>{
        let sum = 0
        props.selectedItens.map((e,i) => {
            sum += e.price
        })

        return sum
    }
    return(
        
        <div className={`container-itens ${extended ? "is-extended" : "is-normal"}`}>
            <div className="header-itens" onClick={() => {handleSize()}}>
                <header>Visualizar Sacola</header>
            </div>
            <div className="m-itens">
               <ul>
                {props.selectedItens ? props.selectedItens.map(e =>{
                    return<li>{e.foodName + " " + e.price + " " + e.quantity} <button onClick={() =>{removeSelectedItem()}}>Remover</button></li>   
                }):''}
               </ul>
            </div>
            <div className="m-itens-total">
                <span>Total:{handleTotal()}</span>
                <button>Confirmar</button>
            </div>
            
        </div>
    )


}
