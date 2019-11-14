import React,{useEffect} from 'react'
import CarouselCard from '../carousel/Carousel'

import './Home.css'
export const Home = (props) => {
    
    useEffect(() =>{
        props.verifyToken()
    },[])

    return(
        <React.Fragment>
            <section className="l-introduction">
                <div className="m-dark center">
                    <div className="m-text-center">
                        <h1>Sem Nome</h1>
                        <p>
                            A melhor pizzaria da penha, variedades de sabores
                            e um ótimo atendimento
                        </p>
                    </div>
                </div>
            </section>
            <section className="l-intermediate center">
                   <div className="m-text-center">
                       <h1>Horários</h1>
                       <p><span className='m-text-featured'>Segunda - Sexta</span> 12hr-20hr</p>
                       <p><span className='m-text-featured'>Sábado</span> 12hr-20hr</p>
                       <p><span className='m-text-featured'>Domingo</span> 12hr-20hr</p>
                   </div>
            </section>
            <section className="l-carousel">
                <CarouselCard></CarouselCard>
            </section>
        </React.Fragment>
    )

}