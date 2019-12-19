import React,{useState,useEffect} from 'react'
import { withRouter,Redirect} from 'react-router-dom';
import axios from 'axios'
import {Orders} from './orders'
import {Categories} from './categories'
import {Foods} from './foods'
import {Users} from './users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './Management.css'

    const Management = (props) => {
    
    const [Component,setComponent] = useState(false)
    const [manegementNavVisible,setManegementNavVisible] = useState(false)
    
    const setComponentToView = (component) => {
           setComponent(component)     
    }

    const verifyRole = () => {
        axios.get('http://localhost:8080/manager/check', {withCredentials: true}).then(e =>{

        }).catch(() =>{
            console.log('erro')
            props.history.push('/')
        })
   }

    useEffect(() => {
        verifyRole()
    },[])

    return(
        <section className="l-management">
            <aside className={`l-management-nav ${manegementNavVisible ? 'is-managemente-nav-visible' : 'is-managemente-nav-hidden'}`}>
                <header>
                    <h3>Gerenciamento</h3>
                </header>
                <ul>
                   <li onClick={() => {
                        setComponentToView('orders')
                    }}>
                        Ver Pedidos
                    </li>
                    <li onClick={() => {
                        setComponentToView('categories')
                    }}>
                        Gerenciar Categorias
                    </li>
                    <li onClick={() => {
                        setComponentToView('foods')
                    }}>
                        Gerenciar Comidas
                    </li>
                    <li onClick={() => {
                        setComponentToView('users')
                    }}>
                        Gerenciar Usuarios
                    </li>
                </ul>
                <div className='management-nav-arrow'  onClick={() => {setManegementNavVisible(!manegementNavVisible)}}>
                    <div className='test-arrow'>
                            {
                                manegementNavVisible ? <FontAwesomeIcon icon = {faChevronLeft}></FontAwesomeIcon>
                                : <FontAwesomeIcon icon = {faChevronRight}></FontAwesomeIcon>
                            }
                           
                    </div>
                </div>
            </aside>
            <div className="m-display-managementItems">
                    {Component === 'orders' ? 
                        <Orders></Orders>
                        :''
                    }
                    {Component === 'categories' ? 
                        <Categories></Categories>
                        :''
                    }
                    {Component === 'foods' ? 
                        <Foods></Foods>
                        :''
                    }
                    {Component === 'users' ? 
                        <Users></Users>
                        :''
                    }
            </div>

        </section>
    )
}

export default withRouter(Management)