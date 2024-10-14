// import '../styles/elements/Lightbox.css'
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


export function LightboxJefe({ lightboxItem, updateState }) {

    useEffect(()=>{
        const cerrarConEsc = (event)=>{
            if(event.code === 'Escape')
            updateState(null)
        };
        document.addEventListener('keydown', cerrarConEsc)
        return ()=>{
            document.removeEventListener('keydown', cerrarConEsc)
        }
    },[updateState])
    
    return (
        <section id='lightbox poup-jefe' className='fixed inset-0 bg-black/80 z-50 w-full h-full' style={{display: lightboxItem? 'block': 'none'}}>
            
            
            {lightboxItem&&
                <article>
                <FontAwesomeIcon className='close-icon' icon={faTimes} onClick={() => updateState(null)} />
                {/* <span className="close" onClick={() => updateState(null)}>&times;</span> */}
                {lightboxItem.nombre&&<h3>{lightboxItem.nombre}</h3>}
                {lightboxItem.period&&<p>{lightboxItem.period}</p>}
                <img src={lightboxItem.imgSrc} alt={`photo of ${lightboxItem.imgSrc}`}/>
                {lightboxItem.detalles&&<p>{lightboxItem.detalles}</p>}
                </article>
            }
        </section>
    )
}
LightboxJefe.propTypes = {
    lightboxItem: PropTypes.object,
    updateState: PropTypes.func.isRequired
}

export function LightboxImg({ imgSrc, updateState }) {
    useEffect(()=>{
        const cerrarConEsc = (event)=>{
            if(event.code === 'Escape')
            updateState(null)
        };
        document.addEventListener('keydown', cerrarConEsc)
        return ()=>{
            document.removeEventListener('keydown', cerrarConEsc)
        }
    },[updateState])
    return (
        <section className='popup-img' style={{display: imgSrc? 'block': 'none'}}>
        <figure>

            <FontAwesomeIcon icon={faTimes} onClick={() => updateState(null)} />
            {imgSrc&&
                <img src={imgSrc} alt='Sin descripción'/>
            }
        </figure>
        </section>
    )
}
LightboxImg.propTypes = {
    imgSrc: PropTypes.string,
    updateState: PropTypes.func.isRequired
}