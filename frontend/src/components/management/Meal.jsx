import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Meal.css'
import { ModalUpload,ModalUpdateName,ModalUpdateImage,ModalUploadFood} from './Modal'
import {Foods} from './Foods'
import {Categories} from './Categories'
export const Meal = (props) => {
    const [categories,setCategories] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
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

    const handleModalVisibility = (value,url) => {
        setUrl(url)
        setModalVisible(value)   
    }

    useEffect(() => {
        getFoodCategory()
    },[])

    return(
        <div className="m-center-column">
            
        <Categories
            categories = {categories}
            getFoodCategory = {getFoodCategory}
            handleModalVisibility = {handleModalVisibility}
        >
        </Categories>

        <Foods
            categories = {categories}
            handleModalVisibility = {handleModalVisibility}
        >
        </Foods>

            <ModalUpload 
                handleModalVisibility = {handleModalVisibility} 
                visible = {modalVisible}  
                refreshCategories = {getFoodCategory}
                url = {url}
                >
            </ModalUpload>

            <ModalUpdateName 
                handleModalVisibility = {handleModalVisibility} 
                visible = {modalVisible}  
                refreshCategories = {getFoodCategory}
                url = {url}
            >
            </ModalUpdateName>

            <ModalUpdateImage
                handleModalVisibility = {handleModalVisibility} 
                visible = {modalVisible} 
                refreshCategories = {getFoodCategory}
                url = {url}    
            >
            </ModalUpdateImage>
        </div>  
    )
}
