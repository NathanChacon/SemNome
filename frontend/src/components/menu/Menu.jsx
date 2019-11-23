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
        <section className="l-menu">
            <div className="l-category">
                {category ? category.map(cat => {
                        return <button className="m-btn-default" onClick={() =>{getFoods(cat.idCategory)}}>{cat.nameCategory}</button>
                }):'carregando'}
            </div>
            <div className="l-display-food">
                        {
                            food ? food.map(element => {
                                return    <Card className="text-center">
                                            <CardImg top height="400px"   src={`http://localhost:8080/${element.image}`} alt="Card image cap" />
                                                <CardBody style={{
                                                    height:'150px'
                                                }}>
                                                    <CardTitle>{element.foodName}</CardTitle>
                                                    <CardSubtitle >R${element.price}</CardSubtitle>
                                                    <Button 
                                                   style={{
                                                       backgroundColor:'rgba(255, 255, 0, 0.925)',
                                                       color:'black',
                                                       border:'none',
                                                       marginTop:'2%'
                                                   }}
                                                    onClick={() =>{handleConfirmItem(element)}}
                                                    >
                                                        Adicionar Na Sacola
                                                    </Button>
                                                 </CardBody>
                                           </Card>
                                       
                            }): 'Carregando'
                        }
            </div>
            
           <ConfirmItens 
           confirmItem = {confirmItem}  addItens = {addItens} handlePrice = {handlePrice}
           newPrice = {newPrice}
           ></ConfirmItens>                 
           <Items selectedItems = {selectedItems} removeItem = {removeItem} ></Items>                 
        </section>
    )
}