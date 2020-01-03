import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Categorie.css'
import { ModalUpload,ModalUpdateName,ModalUpdateImage} from './Modal'
export const Categories= (props) => {

    const [categories,setCategories] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [modalUpdateNameVisibility,setModalUpdateNameVisibility] = useState(false)
    const [modalUpdateImageVisibility,setModalUpdateImageVisibility] = useState(false)
    const [alertVisible,setAlertVisible] = useState(false)
    const [categoryId,setCategoryId] = useState(null)
    const [categoryIdToUpdateName,setCategoryIdToUpdateName] = useState(null)
    const [categoryIdToUpdateImage,setCategoryIdToUpdateImage] = useState(null)
    const [url,setUrl] = useState(false)
    
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

    const handleModalUpdateNameVisibility = (value) => {
        setModalUpdateNameVisibility(value)
    }

    const handleModalUpdateImageVisibility = (value) => {
        setModalUpdateImageVisibility(value)
    }

    const handleAlertVisibility = (value) => {
        setAlertVisible(value)
    }

    useEffect(() => {
        getFoodCategory()
    },[])


    return(
        <div className="m-center-column">
                <h4>Categorias</h4>
                <button className="success-color m-btn m-btn-xl btn-cat" onClick = {() => {handleModalVisibility(true)}}>Adicionar Categoria</button>
            <div className="m-list-container">
                {categories ? categories.map((category) => {
                    return <div className="m-flex-row m-list-items">
                        <div className="m-card list black-border">
                            <img src={`http://localhost:8080${category.image}`} width="100%" height="60%"></img>
                            {category.nameCategory}
                        </div>
                        <button className="danger-color m-btn m-btn-sm" onClick = {() => {
                            setCategoryId(category.idCategory)
                            handleAlertVisibility(true)
                           }}>
                            Deletar Categoria
                        </button>
                        <button className="primary-color m-btn m-btn-sm" onClick = {() => {
                           setCategoryIdToUpdateImage(category.idCategory)
                           handleModalUpdateImageVisibility(true)
                       }}>
                        Alterar Imagem
                      </button>
                       <button className="primary-color m-btn m-btn-sm" onClick = {() => {
                           setCategoryIdToUpdateName(category.idCategory)
                           handleModalUpdateNameVisibility(true)
                       }}>
                        Alterar Nome
                      </button>
                   </div>
            }):''}
        </div>

        <h4 className="border-top food-header">Refeições</h4>
      <form className="m-select-form">
        <label>
          Escolha a categoria da refeição:
            <select >
                <option value="laranja">Laranja</option>
                <option value="limao">Limão</option>
                <option value="coco">Coco</option>
                <option value="manga">Manga</option>
            </select>
        </label>
            <button className="m-btn m-btn-sm success-color">Selecionar</button>
      </form>

        <div className="m-list-container foods">
            
        </div>

            <ModalUpload 
                handleModalVisibility = {handleModalVisibility} 
                visible = {modalVisible}  
                refreshCategories = {getFoodCategory}
                url = {url}
                >
            </ModalUpload>

            <ModalUpdateName 
                handleModalUpdateNameVisibility = {handleModalUpdateNameVisibility}
                categoryId = {categoryIdToUpdateName} 
                visible = {modalUpdateNameVisibility}  
                refreshCategories = {getFoodCategory}
                url = {url}
                >
            </ModalUpdateName>

            <ModalUpdateImage
                handleModalUpdateImageVisibility = {handleModalUpdateImageVisibility}
                visible = {modalUpdateImageVisibility}
                categoryId = {categoryIdToUpdateImage}
                refreshCategories = {getFoodCategory}
                url = {url}    
            >
            </ModalUpdateImage>

            <ConfirmDelete 
                handleAlertVisibility = {handleAlertVisibility} 
                alertVisible = {alertVisible} 
                categoryId = {categoryId} 
                refreshCategories = {getFoodCategory}
                url = {url}
                >
            </ConfirmDelete>
        </div>  
    )
}

const ConfirmDelete = (props) => {
    const [alertVisible,setAlertVisible] = useState(props.alertVisible)
    const [categoryId,setCategoryId] = useState(props.categoryId)

    useEffect(() => {
        setAlertVisible(props.alertVisible)
        setCategoryId(props.categoryId)
    },[props])

    const deleteCategory = () => {
        axios({
            method:'DELETE',
            url:`http://localhost:8080/manager/deleteCategory/${categoryId}`,
            withCredentials:true
        })
        .then(() => {
            console.log('Categoria Deletada Com Sucesso')
            props.refreshCategories()
        })
        .catch((e) => {
            console.log('Ocorreu um erro no servidor')
        })
    }

    return (
        <div className={`m-focus-container ${alertVisible ? 'is-alert-visible' : 'is-alert-hidden'}`}>
            <div className="m-card alert black-border">
                 ATENÇÃO ao deletar uma categoria os itens associados a ela também serão excluidos, deseja continuar?
                <button className ="m-btn success-color m-btn-md" onClick = {() => {deleteCategory()}}>Confirmar</button>
                <button className ="m-btn danger-color m-btn-md" onClick={() => {props.handleAlertVisibility(false)}}>Cancelar</button>
            </div>
        </div>
    )
}