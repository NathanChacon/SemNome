import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Food.css'
import {ModalUploadFood,ModalUpdateImage,ModalUpdateName} from './Modal'

export const Foods = (props) => {

    const [modalUploadFood,setModalUploadFood] = useState(false)
    const [selectedCategory,setSelectedCategory] = useState(false)
    const [foods,setFoods] = useState(false)
    const [categories,setCategories] = useState(props.categories)
    const [url,setUrl] = useState(false)

    useEffect(() => {
        setCategories(props.categories)
    },[props])

    useEffect(() => {
        getFoods(selectedCategory)
    },[selectedCategory])


    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handleModalUploadFoodVisibility = (value) => {
        setModalUploadFood(value)
    }

    const getFoods = (categoryId) => {
        axios({
            method:'GET',
            url:`http://localhost:8080/food/byCategory/${categoryId}`,
            withCredentials:true
        })
        .then((response) => {
            setFoods(response.data.food)
        })
    }
    
    return(
        <div className ="m-center-column">
           <h4 className="border-top food-header">Refeições</h4>
        <div className = "m-center">
            <form className="m-select-form">
                <label>
                    Escolha a categoria da refeição: 
                    <select onChange ={(e) => {handleSelectChange(e)}}>
                        <option value="">Opções</option>
                            {categories ? categories.map((category) => {
                                return <option value={category.idCategory}>{category.nameCategory}</option>
                                }): 'Nenhuma Categoria Criada'}
                    </select>
                </label>
            </form>
            <button className="success-color m-btn m-btn-md" onClick = {() => {handleModalUploadFoodVisibility('uploadFood')}}>Adicionar Refeição</button>
        </div>
           <div className="m-list-container foods">
                  {foods ? foods.map((food) => {
                      return <div className="m-flex-row m-list-items">
                                 <div className="m-card list black-border">
                                     <img src={`http://localhost:8080${food.image}`} width="100%" height="60%"></img>
                                     {food.foodName}
                                     {food.price}
                             </div>
                             <button className="danger-color m-btn m-btn-sm">Deletar Refeição</button>
                             <button className="primary-color m-btn m-btn-sm">Alterar Nome</button>
                             <button className="primary-color m-btn m-btn-sm">Alterar Imagem</button>
                             <button className="primary-color m-btn m-btn-sm">Alterar Preço</button>
                </div>
              }): <h5>Nenhuma Categoria Selecionada</h5>}
          </div>

          <ModalUploadFood
                handleModalUploadFoodVisibility = {handleModalUploadFoodVisibility} 
                foodCategory = {selectedCategory}
                refreshFoods = {getFoods}
                visible = {modalUploadFood}
            >
         </ModalUploadFood>

        </div>

    )
}