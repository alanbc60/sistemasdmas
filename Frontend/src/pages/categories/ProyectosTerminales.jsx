// eslint-disable-next-line no-unused-vars
import React from 'react'
import Footer from '../../components/generalSections/Footer'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import CategoriasBody from '../../components/categorySections/CategoriasBody'
import { useLayoutData } from "../../hooks/useLayoutData";

function ProyectosTerminales() {
  const {layoutData} = useLayoutData('proyectosterminales');
  return (
    <div>
      <Header />
      <HeaderSection layoutData={layoutData} />
      <CategoriasBody categoria="proyectosterminales" />
      <Footer />
      
    </div>
  )
}

export default ProyectosTerminales
