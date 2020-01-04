import React,{useState,useEffect} from 'react'
import axios from 'axios'

export const  Categories = (props) => {
    
    const [url,setUrl] = useState(false)
    const [categories,setCategories] = useState(props.categories)
    const [alertVisible,setAlertVisible] = useState(false)
    
    useEffect(() => {
        setCategories(props.categories)
    },[props])

    const handleAlertVisibility = (value) => {
        setAlertVisible(value)
    }

    return(
        <div className="m-center-column">
                <h4 className="header-cat">Categorias</h4>
                <button className="success-color m-btn m-btn-xl btn-cat" onClick = {() => {props.handleModalVisibility('uploadCategory',"http://localhost:8080/manager/uploadCategory")}}>Adicionar Categoria</button>
            <div className="m-list-container">
                {categories ? categories.map((category) => {
                    return <div className="m-flex-row m-list-items">
                        <div className="m-card list black-border">
                            <img src={`http://localhost:8080${category.image}`} width="100%" height="60%"></img>
                            {category.nameCategory}
                        </div>
                        <button className="danger-color m-btn m-btn-sm" onClick = {() => {
                            setUrl(`http://localhost:8080/manager/deleteCategory/${category.idCategory}`)
                            handleAlertVisibility(true)
                           }}>
                            Deletar Categoria
                        </button>
                        <button className="primary-color m-btn m-btn-sm" onClick = {() => {
                           props.handleModalVisibility('updateImage',`http://localhost:8080/manager/updateCategoryImage/${category.idCategory}`)
                       }}>
                        Alterar Imagem
                      </button>
                       <button className="primary-color m-btn m-btn-sm" onClick = {() => {
                           props.handleModalVisibility('updateName',`http://localhost:8080/manager/updateCategoryName/${category.idCategory}`)
                       }}>
                        Alterar Nome
                      </button>
                   </div>
            }):''}
        </div>

        <ConfirmDelete 
                handleAlertVisibility = {handleAlertVisibility} 
                alertVisible = {alertVisible}  
                refreshCategories = {props.getFoodCategory}
                url = {url}
                >
        </ConfirmDelete>
    </div>
)
}




const ConfirmDelete = (props) => {
    const [alertVisible,setAlertVisible] = useState(props.alertVisible)
    const [url,setUrl] = useState(props.url)

    useEffect(() => {
        setAlertVisible(props.alertVisible)
        setUrl(props.url)
    },[props])

    const deleteCategory = () => {
        axios({
            method:'DELETE',
            url:url,
            withCredentials:true
        })
        .then(() => {
            console.log('Categoria Deletada Com Sucesso')
            props.refreshCategories()
            props.handleAlertVisibility(false)
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