import React,{useEffect,useState} from 'react'
import './Itens.css'

export const Itens = (props) =>{
    const [extended,setExtended] = useState(false)
    const handleSize = () => {
            setExtended(!extended)
    }

    const handleTotal = () =>{
        let sum = 0
        props.itens.map((e,i) => {
            sum += e.price
        })

        return sum
    }
    return(
        
        <div className={`container-itens ${extended ? "is-extended" : "is-normal"}`}>
            <header className="header-itens" onClick={() => {handleSize()}}>Visualizar Sacola</header>
            <div className="m-itens">
               <ul>
                {props.itens ? props.itens.map(e =>{
                    return<li>{e.foodName + " " + e.price}</li>   
                }):''}
               </ul>
            </div>
            <div className="m-itens-total">
                Total:{handleTotal()}
            </div>
        </div>
    )


}

