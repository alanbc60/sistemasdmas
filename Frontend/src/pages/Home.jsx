// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../components/generalSections/Header'
import Footer from '../components/generalSections/Footer'
import HeaderSection from '../components/generalSections/HeaderSection'
import HomeBody from '../components/principalHome/HomeBody'
import BodySuggest from '../components/principalHome/BodySuggest'

function Home() {
  return (
    <>
        <Header/>
        <HeaderSection/>
        <HomeBody/>
        <BodySuggest/>
        <Footer/>
    </>
  )
}

export default Home
