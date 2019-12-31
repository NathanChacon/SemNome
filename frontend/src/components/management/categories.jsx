import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Categorie.css'
import './Modal'
import { Modal } from './Modal'
export const Categories= (props) => {
    const [categories,setCategories] = useState(false)
    const [modalMethod,setModalMethod] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [alertVisible,setAlertVisible] = useState(false)
    const [categoryId,setCategoryId] = useState(false)

    const getFoodCategory = () => {
        axios({
            method:'GET',
            url:'http://localhost:8080/category/all'
        })
        .then((response) => {
            setCategories(response.data.categories)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const handleModalVisibility = (value) => {
        setModalVisible(value)
    }

    useEffect(() => {
        getFoodCategory()
    },[])


    return(
        <div className="m-flex-column">
           {categories ? categories.map((category) => {
            return <div className="m-flex-row m-categories-list">
                       <div className="m-card categorie black-border">
                          <img src={`http://localhost:8080${category.image}`} width="100%"></img>
                          {category.nameCategory}
                       </div>
                       <button className="danger-color m-btn m-btn-md"onClick = {() => {setCategoryId(category.idCategory);setAlertVisible(true)}}>Deletar Categoria</button>
                       <button className="primary-color m-btn m-btn-md">Atualizar Categoria</button>
                   </div>
            }):''}
            <div className ="m-center container-btn">
              <button className="success-color m-btn m-btn-xl" onClick = {() => {handleModalVisibility(true); setModalMethod('newCategory')}}>Adicionar Categoria</button>
            </div>
            <Modal handleModalVisibility = {handleModalVisibility} visible = {modalVisible} method = {modalMethod}></Modal>
        </div>  
    )
}

const deleteConfirm = (props) => {
    return (
        <div className={`m-focus-container${props.alertVisible ? 'is-alert-visible' : 'is-alert-hidden'}`}>
            <div className="m-card black-border">
                 Ao deletar uma categoria os itens associados a ela tambem serão excluidos, deseja continuar?
                <button className ="m-btn m-btn-succes m-btn-md">Confirmar</button>
                <button className ="m-btn m-btn-danger m-btn-md">Cancelar</button>
            </div>
        </div>
    )
}