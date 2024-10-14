// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from "react"
import JefeActual from "../components/jefesdeldmas/JefeActual"
import JefesAnteriores from "../components/jefesdeldmas/JefesAnteriores"
import { LightboxJefe } from "../elements/Lightbox"
import Header from '../components/generalSections/Header'
import HeaderSection from '../components/generalSections/HeaderSection'
import Footer from '../components/generalSections/Footer'
import { useLayoutData } from "../hooks/useLayoutData";


export default function JefesDelDMAS() {
  const { layoutData } = useLayoutData('jefesdeldmas'); // Pasar el nombre de la sección directamente
  const [lightboxItem, setLightboxItem] = useState(null)
  const updateLightboxItem = (newItem)=>{
      setLightboxItem(newItem)
  }

  return (
    <>
        <Header />
        <HeaderSection layoutData={layoutData} />
        <div id="jefesdmas-conteiner" className='flex justify-center flex-wrap gap-[10%] mb-[16px] '>
            <JefeActual updateLightboxItem={updateLightboxItem}/>
            <JefesAnteriores updateLightboxItem={updateLightboxItem}/>
            <LightboxJefe updateState={updateLightboxItem} lightboxItem={lightboxItem}/>
        </div>
        <Footer/>

    </>

  )
}
