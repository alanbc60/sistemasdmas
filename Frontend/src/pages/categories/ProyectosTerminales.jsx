// eslint-disable-next-line no-unused-vars
import React from 'react'
import Footer from '../../components/generalSections/Footer'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import CategoriasBody from '../../components/categorySections/CategoriasBody'
import { useLayoutData } from "../../hooks/useLayoutData";
import { useSelector } from 'react-redux';

function ProyectosTerminales() {
  const {layoutData} = useLayoutData('proyectosterminales');
  const loggedState = useSelector((state) => state.logged); // Accede al reducer 'logged'
  console.log("Estado del usuario: ", loggedState);
  return (
    <div>
      <Header />
      <HeaderSection layoutData={layoutData} />
      <CategoriasBody categoria="proyectosterminales" loginState={loggedState} />
      <Footer />
      
    </div>
  )
}

export default ProyectosTerminales
