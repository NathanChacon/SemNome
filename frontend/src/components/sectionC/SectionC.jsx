import React from 'react'
import {useState} from 'react'
import GoogleApiWrapper from '../map/Map'
import './SectionC.css'

export const SectionC = () => {
    return(
        <section className="sectionC">
          <GoogleApiWrapper></GoogleApiWrapper>
        </section>
    )
}