import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './ModalUpload.css'
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
        formData.append('categoryImage',selectedFile,selectedFile.name)
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
                <label for="categorieIamge">Imagem Categoria</label>
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
