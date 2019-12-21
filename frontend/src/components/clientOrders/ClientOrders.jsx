import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './ClientOrders.css'
export const ClientOrders = () => {
    
    const [clientOrders,setClientOrders] = useState(false) 

    useEffect(() => {
        getClientOrders()
    },[])

    const getClientOrders = () => {
            axios({
                method:'GET',
                withCredentials:true,
                url:'http://localhost:8080/order/allClientOrders'
            })
            .then((response) => {
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
                                        <button>Acompanhar Pedido</button>
                                    </div>
                       }): ''
                   }
            </div>
        </section>
    )

}