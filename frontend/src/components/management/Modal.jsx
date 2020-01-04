import React,{useState,useEffect} from 'react'
import axios from 'axios'

export const ModalUpload = (props) => {
    const [visible,setVisible] = useState(false)
    const [categoryName,setCategoryName] = useState(false)
    const [selectedFile,setSelectedFile] = useState(false)
    const [url,setUrl] = useState(false)
    useEffect(() => {
        setVisible(props.visible)
        setUrl(props.url)
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
        axios.post(url,formData, {withCredentials : true})
        .then(() => {
            props.refreshCategories()
        })
        .catch((e) => {
            console.log(e)
        })
    
    }

    return(
        <div className={`m-modal black-border m-center-column white-color ${visible === "uploadCategory" ? 'is-modal-visible' : 'is-modal-hidden'}`}>
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
    const[url,setUrl] = useState(props.url)
    useEffect(() => {
        setVisible(props.visible)
        setUrl(props.url)
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
            url:url,
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
        <div className={`m-modal black-border m-center-column white-color ${visible === 'updateName' ? 'is-modal-visible' : 'is-modal-hidden'}`}>
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
            <button className="m-btn m-btn-md danger-color" onClick={() => {props.handleModalVisibility(false)}}>Cancelar</button>
        </div>
    )
}

export const ModalUpdateImage = (props) => {
    const [selectedFile,setSelectedFile] = useState(false)
    const [url,setUrl] = useState(props.url)
    const [visible,setVisible] = useState(props.visible)

    useEffect(() => {
        setVisible(props.visible)
        setUrl(props.url)
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
        axios.put(url,formData, {withCredentials : true})
        .then(() => {
            props.handleModalUpdateImageVisibility(false)
            props.refreshCategories()
        })
        .catch((e) => {
            console.log(e)
        })
    }
    return(
        <div className={`m-modal black-border m-center-column white-color ${visible === 'updateImage' ? 'is-modal-visible' : 'is-modal-hidden'}`}>
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
            <button className="m-btn m-btn-md danger-color" onClick={() => {props.handleModalVisibility(false)}}>Cancelar</button>
        </div>
    )
}

export const ModalUploadFood = (props) => {

    const [foodName,setFoodName] = useState(false)
    const [foodPrice,setFoodPrice] = useState(false)
    const [selectedFile,setSelectedFile] = useState(false)
    const [foodCategory,setFoodCategory] = useState(props.foodCategory)
    const [visible,setVisible] = useState(props.visible)

    useEffect(() => {
        setVisible(props.visible)
        setFoodCategory(props.foodCategory)
    },[props])

    const handleFoodName = (event) => {
        setFoodName(event.target.value)
    }

    const handleFoodPrice = (event) => {
        setFoodPrice(event.target.value)
    }

    const handleSelectedFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleUploadNewFood = () => {
        if(!foodName || !foodPrice || !selectedFile){
            return
        }

        const formData = new FormData()
        formData.append('Image',selectedFile,selectedFile.name)
        formData.set('foodName', foodName)
        formData.set('foodPrice', foodPrice)
        formData.set('foodCategory', foodCategory)

        axios.post("http://localhost:8080/manager/uploadFood",formData, {withCredentials : true})
        .then(() => {
            console.log('fui chamado')
            props.refreshFoods(foodCategory)
        })
        .catch((e) => {
            console.log(e)
        })
    }
    return(
            <div className={`m-modal black-border m-center-column white-color ${visible === 'uploadFood' ? 'is-modal-visible' : 'is-modal-hidden'}`}>
                <form className="m-center-column">
                    <label for="foodName">Nome Refeição</label>
                    <input type="text" id="foodName" onChange = {(e) => {handleFoodName(e)}}></input>
                    <label for="foodPrice">Preço Refeição</label>
                    <input type="number" id="foodPrice" onChange = {(e) => {handleFoodPrice(e)}}></input>
                    <label for="foodImage">Imagem Refeição</label>
                    <input type="file" onChange={(e) => {handleSelectedFile(e)}} id="foodImage"></input>
                </form>
                <button className="m-btn m-btn-md success-color"
                onClick={() => {
                        handleUploadNewFood()
                    }}>
                    Enviar
                </button>
                <button className="m-btn m-btn-md danger-color" onClick={() => {props.handleModalUploadFoodVisibility(false)}}>Cancelar</button>
            </div>
    )
}