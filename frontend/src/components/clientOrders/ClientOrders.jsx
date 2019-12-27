import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { withRouter,Redirect} from 'react-router-dom';
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'
import './ClientOrders.css'
const ClientOrders = (props) => {
    
    const [clientOrders,setClientOrders] = useState(false) 
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getClientOrders()
    },[])

    const getClientOrders = () => {
            setLoading(true)
            axios({
                method:'GET',
                withCredentials:true,
                url:'http://localhost:8080/order/allClientOrders'
            })
            .then((response) => {
                setLoading(false)
                setClientOrders(response.data.orders)
            })
    }



    return(
        <section className="l-clientOrders">
            <div className="m-clienteOrder-container">
                   {
                       clientOrders ? clientOrders.map((order) => {
                            return  <div className ="m-clientOrder-card">
                                        <h4>{order.description}</h4>
                                        <p>Total:{order.amount} </p>
                                        <Link to={{
                                            pathname:'trackOrder',
                                            state: order.orderId
                                    }} className='m-btn-default link'>Acompanhar Pedido</Link>
                                    </div>
                       }): ''
                   }
                   {
                       loading ?
                           <Loader></Loader> :
                           ''
                   }
            </div>
        </section>
    )
}

export default  withRouter(ClientOrders)