import React,{useEffect} from 'react'
import './SectionA.css'
export const SectionA = (props) => {
    
    useEffect(() =>{
        props.verifyToken()
    },[])
    return(
       <section className="section l-sectionA">
           <div className="Dark">
            
           </div>
           <div className="TextContainer TextA">
               <header>Sem Nome</header>
               <p>
                  Venha conhecer a melhor pizzaria da penha
                  com diversos sabores de pizza e sobremesa
                  nosso ambiente é calmo e bem dinamico
               </p>     
           </div>
       </section>
    )
}