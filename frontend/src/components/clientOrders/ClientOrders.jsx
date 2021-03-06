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
        <section className="l-center client-order white-color">
            <div className="m-grid orders">
                   {
                       clientOrders ? clientOrders.map((order) => {
                            return  <div className ="black-border m-clientOrder-card">
                                        <h4>{order.description}</h4>
                                        <p>Total:{order.amount} </p>
                                        <Link to={{
                                            pathname:'trackOrder',
                                            state: order.orderId
                                    }} className='m-btn m-btn-md yellow-color m-link'>Acompanhar Pedido</Link>
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