// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../../components/generalSections/Header'
import HeaderSection from '../../components/generalSections/HeaderSection'
import Footer from '../../components/generalSections/Footer'
import CategoriasBody from '../../components/categorySections/CategoriasBody'

function Seminarios() {
  return (
    <>
      <Header/>
      <HeaderSection/>
      <CategoriasBody categoria='seminarios' loginState={true}/>
      <Footer/>
    </>
  )
}

export default Seminarios
