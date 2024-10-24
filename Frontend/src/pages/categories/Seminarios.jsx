// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import Footer from '../../components/generalSections/Footer'
import CategoriasBody from '../../components/categorySections/CategoriasBody'
import { useLayoutData } from "../../hooks/useLayoutData";
import { useSelector } from 'react-redux';
//import { Loading } from '../../elements/Loading'

function Seminarios() {

  const { layoutData } = useLayoutData('seminarios'); 
  const loggedState = useSelector((state) => state.logged); // Accede al reducer 'logged'
  console.log("Estado del usuario: ", loggedState);

  // imprimir el estado de login
  console.log("loginState:", loggedState);
  console.log("Layout Data en Seminarios:", layoutData);


  return (
    <>
      <Header />
      <HeaderSection layoutData={layoutData} />
      <CategoriasBody categoria="seminarios" loginState={loggedState} />
      <Footer />
    </>
  );
}

export default Seminarios;
