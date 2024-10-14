// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from 'react'
import { siteManagement } from '../data/sections'
import Header from '../components/generalSections/Header'
import HeaderSection from '../components/generalSections/HeaderSection'
import Footer from '../components/generalSections/Footer'
import { useLayoutData } from "../hooks/useLayoutData";

/**
 * 
 * @returns 
 * Componente con dos listas no ordenadas con información de la administración de la página
 * una contiene la labor o puesto y otra los nombres, obtiene la informacion de un arreglo de la carpeta data
 */
export default function AcercaDe() {
    const [currentSiteManagement, setcurrentSiteManagement] = useState(siteManagement[0])
    const [activeIndex, setActiveIndex] = useState(0);

    const {layoutData} = useLayoutData('acercade');

    const handleClickSiteManagementMenu = (index) => {
        setcurrentSiteManagement(siteManagement[index])
        setActiveIndex(index)
    }

    return (


        <>
            <Header/>
            <HeaderSection layoutData={layoutData} />
            <div id='acercade-conteiner' className='flex flex-wrap items-center justify-center gap-[5%] pb-[1.75rem]'>
                <ul id='acercade-nav' className='list-none p-0 m-0 flex flex-col gap-[1.25rem]'>
                    {siteManagement.map((e, index) => (
                        <li key={`${index}-nav`} className={`cursor-pointer px-3 text-center h-6 ${activeIndex === index ? 'active' : ''}`}>
                            <button onClick={() => handleClickSiteManagementMenu(index)} className={`min-w-[150px] hover:text-orange-500 relative after:absolute after:w-full after:h-1 after:bg-orange-500 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${activeIndex === index ? 'underline underline-offset-[3px] decoration-[3px] decoration-orange-uam' : ''}`}>
                                {e.title}
                            </button>
                        </li>
                    ))}
                </ul>
                
                <ul id='acercade-members' className='border border-dashed border-orange-uam border-l-0 border-r-0' >{currentSiteManagement.members.map((e, index) => (
                    <li key={`${index}-member`} className='list-none p-4 m-0 flex flex-col gap-2 '>{e}</li>
                ))}</ul>
            </div>
            <Footer/>
        </>


    )
}
