import React,{useEffect,useState} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios'


export const OwlCarouselComponent = () => {
    
    const [categoryItems,setCategoryItems] = useState(false)

    useEffect(() => {
        axios({
            method:'GET',
            url:'http://localhost:8080/category/all'
        })
        .then((items) => {
            setCategoryItems(items.data.categories)
        })
    },[])

    const options = {
        loop:true,
        margin:10,
        dots:false,
        autoplay:true,
        autoplayTimeout:5000,
        responsiveClass:true,
        navigation:true,
        responsive:{
            0:{
                items:3,
                nav:true
            },
            600:{
                items:3,
                nav:true,
                loop:true
            },
            1000:{
                items:4,
                nav:true,
                loop:true
            }
        }
    };

    return(
        <OwlCarousel className="owl-theme" {...options}>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
            <div> <img src="http://localhost:8080/pizza.jpg"></img></div>
    </OwlCarousel>
    )
}