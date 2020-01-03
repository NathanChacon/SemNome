import React,{useState,useEffect} from 'react'
import axios from 'axios'

export const ModalUpload = (props) => {
    const [visible,setVisible] = useState(false)
    const [categoryName,setCategoryName] = useState(false)
    const [selectedFile,setSelectedFile] = useState(false)

    useEffect(() => {
        setVisible(props.visible)
    },[props])

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value) 
    }

    const handleSelectedFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleUploadNewCategory = () => {
        if(categoryName === false || selectedFile === false){
            return
        }
        const formData = new FormData()
        formData.append('Image',selectedFile,selectedFile.name)
        formData.set('categoryName', categoryName)
        axios.post("http://localhost:8080/manager/uploadCategory",formData, {withCredentials : true})
        .then(() => {
            props.refreshCategories()
        })
        .catch((e) => {
            console.log(e)
        })
    
    }

    return(
        <div className={`m-modal black-border m-center-column white-color ${visible ? 'is-modal-visible' : 'is-modal-hidden'}`}>
            <form className="m-center-column">
                <label for="categorieName">Nome Categoria</label>
                <input type="text" id="categorieName" onChange = {(e) => {handleCategoryName(e)}}></input>
                <label for="categorieImage">Imagem Categoria</label>
                <input type="file" onChange={(e) => {handleSelectedFile(e)}} id="categorieImage"></input>
            </form>
            <button className="m-btn m-btn-md success-color"
            onClick={() => {
                    handleUploadNewCategory()
                }}>
                Enviar
            </button>
            <button className="m-btn m-btn-md danger-color" onClick={() => {props.handleModalVisibility(false)}}>Cancelar</button>
        </div>
    )
}

export const ModalUpdateName = (props) => {
    const [categoryName,setCategoryName] = useState(false)
    const [visible,setVisible] = useState(props.visible)

    useEffect(() => {
        setVisible(props.visible)
    },[props])

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value)
    }
    
    const handleUpdateName = () => {
        if(!categoryName){
            return
        }
        axios({
            method:'PUT',
            url:`http://localhost:8080/manager/updateCategoryName/${props.categoryId}`,
            withCredentials:true,
            data:{
                categoryName:categoryName
            },
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            props.handleModalUpdateNameVisibility(false)
            props.refreshCategories()
        })
        .catch(() => {
            console.log('ocorreu algum erro')
        })
    }
    return(
        <div className={`m-modal black-border m-center-column white-color ${visible ? 'is-modal-visible' : 'is-modal-hidden'}`}>
            <form className="m-center-column">
                <label for="categorieName">Nome Categoria</label>
                <input type="text" id="categorieName" onChange = {(e) => {handleCategoryName(e)}}></input>
            </form>
            <button className="m-btn m-btn-md success-color"
            onClick={() => {
                   handleUpdateName()
            }}>
                Enviar
            </button>
            <button className="m-btn m-btn-md danger-color" onClick={() => {props.handleModalUpdateNameVisibility(false)}}>Cancelar</button>
        </div>
    )
}

export const ModalUpdateImage = (props) => {
    const [selectedFile,setSelectedFile] = useState(false)
    const [visible,setVisible] = useState(props.visible)

    useEffect(() => {
        setVisible(props.visible)
    },[props])

    const handleSelectedFile = (event) => {
        setSelectedFile(event.target.files[0])
    }
    
    const handleUpdateImage = () => {
        if(!selectedFile){
            return  
        }
        const formData = new FormData()
        formData.append('Image',selectedFile,selectedFile.name)
        axios.put(`http://localhost:8080/manager/updateCategoryImage/${props.categoryId}`,formData, {withCredentials : true})
        .then(() => {
            props.handleModalUpdateImageVisibility(false)
            props.refreshCategories()
        })
        .catch((e) => {
            console.log(e)
        })
    }
    return(
        <div className={`m-modal black-border m-center-column white-color ${visible ? 'is-modal-visible' : 'is-modal-hidden'}`}>
            <form className="m-center-column">
                <label for="categorieImage">Imagem Categoria</label>
                <input type="file" onChange={(e) => {handleSelectedFile(e)}} id="categorieImage"></input>
            </form>
            <button className="m-btn m-btn-md success-color"
            onClick={() => {
                   handleUpdateImage()
            }}>
                Enviar
            </button>
            <button className="m-btn m-btn-md danger-color" onClick={() => {props.handleModalUpdateImageVisibility(false)}}>Cancelar</button>
        </div>
    )
}