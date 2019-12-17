import React,{useState,useEffect} from 'react'
import {Orders} from './orders'
import {Categories} from './categories'
import {Foods} from './foods'
import {Users} from './users'
import './Management.css'

export const Management = (props) => {
    
    const [Component,setComponent] = useState(false)

    const setComponentToView = (component) => {
           setComponent(component)     
    }

    return(
        <section className="l-management">
            <aside className='m-management-nav'>
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