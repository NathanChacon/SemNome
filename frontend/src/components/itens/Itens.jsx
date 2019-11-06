import React,{useEffect,useState} from 'react'
import './Itens.css'

export const Itens = (props) =>{
    const [extended,setExtended] = useState(false)
    
    const handleSize = () => {
            setExtended(!extended)
    }   
    return(
        <div className={`container-itens ${props.itens != '' ? "is-visible" : "is-hidden"} ${extended ? "is-extended" : "is-normal"}`}>
            <header className="header-itens" onClick={() => {handleSize()}}>Visualizar Sacola</header>
            <div className="m-itens">
                Teste
            </div>
        </div>
    )


}
