// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from "react"
import JefeActual from "../components/jefesdeldmas/JefeActual"
import JefesAnteriores from "../components/jefesdeldmas/JefesAnteriores"
import { LightboxJefe } from "../elements/Lightbox"
import Header from '../components/generalSections/Header'
import HeaderSection from '../components/generalSections/HeaderSection'


export default function JefesDelDMAS() {
  const [lightboxItem, setLightboxItem] = useState(null)
  const updateLightboxItem = (newItem)=>{
      setLightboxItem(newItem)
  }

  return (
        <>
            <Header />
            <HeaderSection />
            <div id="jefesdmas-conteiner">
              <JefeActual updateLightboxItem={updateLightboxItem}/>
              <JefesAnteriores updateLightboxItem={updateLightboxItem}/>
              <LightboxJefe updateState={updateLightboxItem} lightboxItem={lightboxItem}/>
            </div>
        </>

  )
}
