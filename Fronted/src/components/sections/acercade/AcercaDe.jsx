import { useState } from "react"
import { siteManagement } from "../../../data/sections"

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
        <div id='acercade-conteiner'>
        <ul id='acercade-nav'>{siteManagement.map((e,index)=>(
                    <li key={`${index}-nav`} className={`acercade-nav-btn ${activeIndex===index? 'active': ''}`}>
                        <button onClick={()=>handleClickSiteManagementMenu(index)}>
                        {e.title}
                        </button>
                    </li>
                    ))}
        </ul>
        <ul id='acercade-members'>{currentSiteManagement.members.map((e,index)=>(
            <li key={`${index}-member`} className='acercade-member'>{e}</li>
        ))}</ul>
        </div>
    )
}
