import React,{useState,useEffect} from 'react' 
import {Link,Route} from 'react-router-dom'
import {Orders} from './orders'
import {Categories} from './Categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './ManagementNav.css'
export const ManagementNav = (props) => {
    const [manegementNavVisible,setManegementNavVisible] = useState(false)
    return(
        <section className ="l-fullSize">
        <aside className={`m-aside management black-border white-color ${manegementNavVisible ? 'is-managemente-nav-visible' : 'is-managemente-nav-hidden'}`}>
        <header>
            <h3>Gerenciamento</h3>
        </header>
        <ul>
            <li>
                <Link to ="/management/orders" className ="m-link">Pedidos</Link>
            </li>
            <li>
                <Link to ="/management/categories" className ="m-link">Cartegorias</Link>
            </li>
            <li>
                <Link to ="/orders" className ="m-link">Comidas</Link>
            </li>
            <li>
                <Link to ="/orders" className ="m-link">Usuarios</Link>
            </li>
        </ul>
        <div className='m-center nav-arrow'  onClick={() => {setManegementNavVisible(!manegementNavVisible)}}>
            <div className='test-arrow'>
                    {
                        manegementNavVisible ? <FontAwesomeIcon icon = {faChevronLeft}></FontAwesomeIcon>
                        : <FontAwesomeIcon icon = {faChevronRight}></FontAwesomeIcon>
                    }
                   
            </div>
        </div>
    </aside>
    <section className="l-beside-aside">
        <Route path = '/management/orders' component = {Orders}></Route>
        <Route path = '/management/categories' component = {Categories}></Route>
    </section>
    </section>
    )
}
