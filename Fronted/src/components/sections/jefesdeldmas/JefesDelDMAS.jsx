import { useState } from "react"
import JefeActual from "./JefeActual"
import JefesAnteriores from "./JefesAnteriores"
import { LightboxJefe } from "../../../elements/Lightbox"

/**
 * 
 * @returns renderiza al jefe actual y anteriores, además de controlar el estado de un lightbox que mostrará más información del jefe al que se le haga click
 */
export default function JefesDelDMAS() {
    const [lightboxItem, setLightboxItem] = useState(null)
    const updateLightboxItem = (newItem)=>{
        setLightboxItem(newItem)
    }

    return (
        <div id="jefesdmas-conteiner">
            <JefeActual updateLightboxItem={updateLightboxItem}/>
            <JefesAnteriores updateLightboxItem={updateLightboxItem}/>
            <LightboxJefe updateState={updateLightboxItem} lightboxItem={lightboxItem}/>
        </div>
    )
}
