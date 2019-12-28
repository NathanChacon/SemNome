import React,{useState,useEffect} from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {Items} from '../items/Items'
import {ConfirmItens} from '../confirmItens/ConfirmItens'
import axios from 'axios'
import './Menu.css'


export const Menu = (props) =>{
    
    const [food,setFood] = useState(null)
    const [newPrice,setNewPrice] = useState(null)
    const [category,setCategory] = useState(null)
    const [selectedItems,setselectedItems] = useState([])
    const [confirmItem,setConfirmItem] = useState(null)
    const [idRemove,setIdRemove] = useState(0)
    
    useEffect(() => {
        getFoods(1)
        getAllCategories()
        props.verifyToken()
    },[])

    useEffect(() => {

    },[newPrice])

    const getFoods = (id) =>{
        axios.get( `http://localhost:8080/food/${id}`).then((res) =>{
                    setFood(res.data.food)
        })
    }

    const getAllCategories = () => {
        axios.get('http://localhost:8080/category/all').then(res => {
           setCategory(res.data.categories) 
        })
    }

    const handleConfirmItem = (element) =>{
        setConfirmItem(element) 
    }


const handlePrice = (price,quantity) => {
    parseFloat(price)
    setNewPrice(price * quantity)
    return newPrice
}
   

    const addItens = (element,quantity) => {
        const newFeatures = {
            ...element,
            idRemove: idRemove,
            quantity:quantity
        }
        setIdRemove(idRemove + 1)
        setselectedItems([...selectedItems,newFeatures])
        setConfirmItem(null)
    }


    const removeItem = (idRemove) => {
            const updatedItens = selectedItems.filter(item => {
                            return item.idRemove != idRemove
            })

            setselectedItems(updatedItens)
    }

    return(
        <section className="white-color l-menu">
            <div className="black-border m-category">
                {category ? category.map(cat => {
                        return <button className="m-btn-default" onClick={() =>{getFoods(cat.idCategory)}}>{cat.nameCategory}</button>
                }):'carregando'}
            </div>
            <div className ="l-center">
                <div className="m-grid grid-food">
                            {
                                food ? food.map(element => {
                                    return  <div className="black-border m-card"> 
                                                    <img src={`http://localhost:8080/${element.image}`} height="50%" width="100%"></img>
                                                    <h5>{element.foodName}</h5>
                                                    <p>R$ {element.price}</p>
                                                    <button className="m-btn-default btn-food-card" onClick={() => {handleConfirmItem(element)}}>Adicionar na sacola</button>
                                            </div>
                                        
                                }): 'Carregando'
                            }
                </div>
            </div>

            
           <ConfirmItens 
           confirmItem = {confirmItem}  addItens = {addItens} handlePrice = {handlePrice}
           newPrice = {newPrice}
           ></ConfirmItens>                 
           <Items selectedItems = {selectedItems} removeItem = {removeItem} ></Items>                 
        </section>
    )
}