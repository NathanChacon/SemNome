import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Categorie.css'
export const Categories= (props) => {
    const [categories,setCategories] = useState(false)
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
                       <button className="danger-color m-btn m-btn-md">Deletar Categoria</button>
                       <button className="primary-color m-btn m-btn-md">Atualizar Categoria</button>
                   </div>
            }):''}
            <div className ="m-center container-btn">
              <button className="success-color m-btn m-btn-xl">Adicionar Categoria</button>
            </div>
        </div>  
    )
}