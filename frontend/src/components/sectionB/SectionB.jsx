import React from 'react'
import {useState} from 'react'
import CarouselCard from '../carousel/Carousel'
import './SectionB.css'

export const SectionB = () => {
    return(
        <section className="section l-sectionB">
            <div className="WrapCarousel">
               <CarouselCard></CarouselCard>
            </div>
            
        </section>
    )
}