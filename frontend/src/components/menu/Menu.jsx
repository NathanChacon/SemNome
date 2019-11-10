import React,{useState,useEffect} from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {Itens} from '../itens/Itens'
import {ConfirmItens} from '../confirmItens/ConfirmItens'
import axios from 'axios'
import './Menu.css'


export const Menu = (props) =>{
    const [food,setFood] = useState(null)
    const [itens,setItens] = useState([])
    const [quantity,setQuantity] = useState(1)
    const [newPrice,setNewPrice] = useState(null)
    const [category,setCategory] = useState(null)
    const [selectedItens,setSelectedItens] = useState([])
    const [confirmItem,setConfirmItem] = useState(null)

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



    const handleQuantity = (method) =>{
        if(method === 'increase'){
            setQuantity(quantity + 1)
        }else{
            if(quantity != 1){
                setQuantity(quantity - 1)
            }else{
                return
            }  
        }
    }

const handlePrice = (price) => {
    parseFloat(price)
    setNewPrice(price * quantity)
    return newPrice
}
   

    const addItens = (element) => {
        const newFeatures = {
            ...element,
            price: newPrice,
            quantity:quantity
        }
        setSelectedItens([...selectedItens,newFeatures])
        setConfirmItem(null)
    }

    return(
        <section className="section menu">
            <div className="container-category">
                {category ? category.map(cat => {
                        return <button className="m-category" onClick={() =>{getFoods(cat.idCategory)}}>{cat.nameCategory}</button>
                }):'carregando'}
            </div>
            <div className="container-food">
                        {
                            food ? food.map(element => {
                                return    <Card className="text-center">
                                            <CardImg top width="100%"   src={`http://localhost:8080/${element.image}`} alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle className="h3">{element.foodName}</CardTitle>
                                                    <CardSubtitle className="h4">Preço: {element.price}</CardSubtitle>
                                                    <Button 
                                                    style={{backgroundColor:"#fffc06",fontSize:"2em",marginTop:'2%',color:"black",border:"none"}}
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
           confirmItem = {confirmItem} handlePrice = {handlePrice} quantity = {quantity} handleQuantity = {handleQuantity} addItens = {addItens}
           newPrice = {newPrice}
           ></ConfirmItens>                 
           <Itens selectedItens = {selectedItens}></Itens>                 
        </section>
    )
}