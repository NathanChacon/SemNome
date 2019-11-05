import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Menu.css'


export const Menu = (props) =>{
    const [food,setFood] = useState(null)
    const [category,setCategory] = useState(null)
    
    useEffect(() => {
        getFoods(1)
        props.verifyToken()
    },[])

    const getFoods = (id) =>{
        axios.get( `http://localhost:8080/food/${id}`).then((res) =>{
                    setFood(res.data.food)
        })
    }

    return(
        <section className="section menu">
            <div className="container-itens">
                        {
                            food ? food.map(element => {
                                return <div className="foodItens" key={element.id}>
                                            <img src={`http://localhost:8080/${element.image}`} height="60%" width="100%"></img>
                                            <header>{element.foodName}</header>
                                            <p>Preço: {element.price}</p>
                                            <button className="m-btnFood">Fazer Pedido</button>
                                       </div>
                            }): 'Carregando'
                        }
            </div>
            

        </section>
    )
}