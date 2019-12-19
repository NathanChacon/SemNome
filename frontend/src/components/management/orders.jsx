import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './orders.css'
export const Orders= (props) => {
    const [orders,setOrder] = useState(false)
    

    useEffect(() => {
        getOrders()
        setInterval(() => {
            getOrders()
        },4000)
    },[])

    const getOrders = () => {
            axios({
                method: 'GET',
                withCredentials:true,
                url:'http://localhost:8080/manager/allOrders'
            })
            .then((response) => {
                setOrder(response.data.orders)
            })
    }

    const changeOrderStatus = (orderId,status) => {
        axios({
            method:'PUT',
            url:'http://localhost:8080/manager/orderStatus',
            withCredentials:true,
            data:{
                  orderId:orderId,
                  status:status
                },
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    return(
            <React.Fragment>
            <header className="management-component-header">
                <h3>Pedidos</h3>
            </header>
           <table className="l-order-table">
                <thead>
                    <tr>
                        <th>Nome Usuário</th>
                        <th>Endereço</th>
                        <th>Pedido</th>
                        <th>Total</th>
                        <th>Troco</th>
                        <th>Pagamento</th>
                        <th>Data</th>
                        <th>Gerenciamento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders ? orders.map((order) => {
                            return <tr scope="row">
                                      <td>{order.userName}</td>
                                      <td>{order.address}</td>
                                      <td>{order.description}</td>
                                      <td>{order.amount}</td>
                                      <td>{order.change}</td>
                                      <td>{order.method}</td>
                                      <td>{order.date}</td>
                                      <td className="btn-group">
                                          <button className="btn btn-warning" onClick ={() => {
                                              changeOrderStatus(order.orderId,'preparing')
                                          }}>Preparando</button>
                                          <button className="btn btn-success" onClick ={() => {
                                              changeOrderStatus(order.orderId,'ready')
                                          }}>Pronto</button>
                                          <button className="btn btn-danger" onClick ={() => {
                                              changeOrderStatus(order.orderId,'finish')
                                          }}>Finalizado</button>
                                      </td>
                                    </tr>
                    }):''
                }
            </tbody>
        </table>
    </React.Fragment>
    )
}