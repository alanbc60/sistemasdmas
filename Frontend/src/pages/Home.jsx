// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../components/generalSections/Header'
import Footer from '../components/generalSections/Footer'
import HeaderSection from '../components/generalSections/HeaderSection'
import HomeBody from '../components/principalHome/HomeBody'
import BodySuggest from '../components/principalHome/BodySuggest'
import { useLayoutData } from "../hooks/useLayoutData";

function Home() {

  const {layoutData} = useLayoutData("");

  return (
    <>
        <Header/>
        <HeaderSection layoutData={layoutData || {}} />
        {console.log("layoutData en Home:", layoutData)}
        <HomeBody/>
        <BodySuggest/>
        <Footer/>
    </>
  )
}

export default Home