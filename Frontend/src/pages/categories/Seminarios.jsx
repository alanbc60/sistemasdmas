// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import Footer from '../../components/generalSections/Footer'
import CategoriasBody from '../../components/categorySections/CategoriasBody'
import { useLayoutData } from "../../hooks/useLayoutData";
// import { useEffect, useState } from 'react';
//import { Loading } from '../../elements/Loading'

function Seminarios() {

  const { layoutData } = useLayoutData('seminarios'); 

  // const [showLoading, setShowLoading] = useState(true);


  console.log("Layout Data en Seminarios:", layoutData);

  // useEffect(() => {
  //   if (!loading) {
  //     const timer = setTimeout(() => {
  //       setShowLoading(false); // Ocultar la pantalla de carga después de 2 segundos
  //     }, 2000); // Tiempo adicional de espera (2 segundos)

  //     return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  //   }
  // }, [loading]);

  // // Mostrar pantalla de carga mientras 'loading' o 'showLoading' es true
  // if (loading || showLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-lg font-semibold">Cargando...</p>
  //     </div>
  //   );
  // }
  // // Mostrar mensaje si no se encuentran los datos
  // if (!layoutData) {
  //   return <p className="text-center mt-5">No se pudo cargar la información.</p>;
  // }

  

  return (
    <>
      <Header />
      <HeaderSection layoutData={layoutData} />
      <CategoriasBody categoria="seminarios" loginState={true} />
      <Footer />
    </>
  );
}

export default Seminarios;
