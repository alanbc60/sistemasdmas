import React from 'react'
import { useState } from 'react'
import { siteManagement } from '../../data/sections'

/**
 * 
 * @returns 
 * Componente con dos listas no ordenadas con información de la administración de la página
 * una contiene la labor o puesto y otra los nombres, obtiene la informacion de un arreglo de la carpeta data
 */
export default function AcercaDe() {
    const [currentSiteManagement, setcurrentSiteManagement]= useState(siteManagement[0])
    const [activeIndex, setActiveIndex]= useState(0)
    
    const handleClickSiteManagementMenu = (index)=>{
        setcurrentSiteManagement(siteManagement[index])
        setActiveIndex(index)
    }

    return (
        <div id='acercade-conteiner' className='flex flex-wrap items-center justify-center gap-[5%] pb-[1.75rem]'>
        <ul id='acercade-nav' className='list-none p-0 m-0 flex flex-col gap-[1.25rem]  '>{siteManagement.map((e,index)=>(
                    <li key={`${index}-nav`} className={`cursor-pointer px-3 text-center  h-6 ${activeIndex===index? 'active': ''}`}>
                        <button onClick={()=>handleClickSiteManagementMenu(index)} className='min-w-[150px] hover:text-orange-500 nav-link relative after:absolute after:w-full after:h-0.5 after:bg-orange-500 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform'>
                        
                        {e.title}
                        
                        
                        </button>
                    </li>
                    ))}
        </ul>
        <ul id='acercade-members' className='border border-dashed border-orange-uam border-l-0 border-r-0' >{currentSiteManagement.members.map((e,index)=>(
            <li key={`${index}-member`} className='list-none p-4 m-0 flex flex-col gap-2 '>{e}</li>
        ))}</ul>
        </div>
    )
}
