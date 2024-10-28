// eslint-disable-next-line no-unused-vars
import React from 'react'
import Footer from '../../components/generalSections/Footer'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import CategoriasBody from '../../components/categorySections/CategoriasBody'
import { useLayoutData } from "../../hooks/useLayoutData";
import { useSelector } from 'react-redux';

function Eventos() {
  const {layoutData} = useLayoutData('eventos');
  const loggedState = useSelector((state) => state.logged); // Accede al reducer 'logged'
  console.log("Estado del usuario: ", loggedState);
  return (
    <>  
      <Header/>
      <HeaderSection layoutData={layoutData}/>
      <CategoriasBody categoria='eventos' loginState={loggedState}/>
      <Footer/> 
    </>
  
  )
}

export default Eventos