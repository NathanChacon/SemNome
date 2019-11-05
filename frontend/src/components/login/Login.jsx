import React,{useEffect} from 'react'

import './Login.css'


export const Login = (props) =>{
    useEffect(() =>{
        console.log('Login')
        console.log(props)
    },[])
    
    return(
        <section className="section login"> 
            <a href="http://localhost:8080/auth/facebook" className="btnFace" target='blank'>Entrar Com Facebook</a>
        </section>
        
    )
}