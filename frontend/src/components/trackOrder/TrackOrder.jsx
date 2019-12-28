import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './TrackOrder.css'
import {withRouter} from 'react-router-dom'

const TrackOrder = (props) => {
    const [orderStatus,setOrderStatus] = useState(false)
    useEffect(() => {
        if(!props.location.state){
            console.log('Sem id')
        }
        else{
            getClientOrder(props.location.state)
        }
    },[])

    const getClientOrder = (orderId) => {
        setInterval(() => {
            axios({
                method:'GET',
                url:`http://localhost:8080/order/track/${orderId}`,
                withCredentials:true
            })
            .then(response => {
               setOrderStatus(response.data.orderStatus[0].status)
               console.log(response.data.orderStatus[0].status)
            })
        },5000)
    }   

    return(
        <section className='padding-top black-color l-center'>
            <div className='m-center order-status'>
                <div className='m-center-column'>
                    <div className="circle-shape is-circle-activated">

                    </div>
                    <div className="status-text is-status-text-activated">
                        <header>
                            <h5>Entregue</h5>
                        </header>
                        <p>O seu pedido foi enviado com sucesso!</p>
                    </div>
                </div>
                <div className='m-center-column'>
                    <div className={`circle-shape ${orderStatus === 'preparing' || orderStatus === 'ready' ? 'is-circle-activated':''}`}>

                    </div>
                    <div className={`status-text ${orderStatus === 'preparing' || orderStatus === 'ready'  ? 'is-status-text-activated':''}`}>
                        <header>
                            <h5>Preparando</h5>
                        </header>
                        <p>O seu pedido ja está sendo preparado!</p>
                    </div>
                </div>

                <div className='m-center-column'>
                    <div className={`circle-shape ${orderStatus === 'ready' ? 'is-circle-activated':''}`}>

                    </div>
                    <div className={`status-text ${orderStatus === 'ready' ? 'is-status-text-activated':''}`}>
                        <header>
                            <h5>A caminho</h5>
                        </header>
                        <p>O seu pedido está a caminho!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default withRouter(TrackOrder)