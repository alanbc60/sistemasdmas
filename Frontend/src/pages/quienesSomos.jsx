import React from 'react'
import Header from '../components/generalSections/Header'
import HeaderSection from '../components/generalSections/HeaderSection'
import Footer from '../components/generalSections/Footer'
import { useLayoutData } from "../hooks/useLayoutData";

export default function quienesSomos() {

    const { layoutData } = useLayoutData('quienessomos');

    return (


        <>
            <Header />
            <HeaderSection layoutData={layoutData} />
                <div id='quienessomos-conteiner' className=''>
                </div>
            <Footer />
        </>


    )
}
