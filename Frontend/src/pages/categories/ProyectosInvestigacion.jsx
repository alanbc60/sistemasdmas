// eslint-disable-next-line no-unused-vars
import React from 'react'
import Footer from '../../components/generalSections/Footer'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import CategoriasBody from '../../components/categorySections/CategoriasBody'
import { useLayoutData } from "../../hooks/useLayoutData";
function ProyectosInvestigacion() {
  const {layoutData} = useLayoutData('proyectosinvestigacion');
  return (
    <>
      <Header/>
      <HeaderSection layoutData={layoutData}/>
      <CategoriasBody categoria='proyectosinvestigacion' loginState={true}/>
      <Footer/>
    </>
  )
}

export default ProyectosInvestigacion
