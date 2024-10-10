// eslint-disable-next-line no-unused-vars
import React from 'react';
import noImg from '../../assets/jefesdeldmas/default.png';
import PropTypes from 'prop-types';

/**
 * 
 * @param {object, func}  
 * jefe es un objeto con la infomación que se mostrara
 * updateLightboxItem actualiza el estado del lightbox del padre
 * @returns contenedor con informacion de los jefes anteriores y foto
 */
export default function JefeItem({jefe, updateLightboxItem}) {
    const handleClick = (item)=>{
        updateLightboxItem(item)
    }
    
    return(
        <div className='jefe-item-container'>
            <div className='jefe-item-info'>
                <figure className='jefe-item-figure' onClick={()=>handleClick(jefe)}>
                    <button className='button-container'>
                    <img className='jefe-item-img' alt={`foto de ${jefe.nombre}`} src={jefe.imgSrc? jefe.imgSrc: noImg } />
                    </button>
                </figure>
                <div className='jefe-item-desc'>
                <p className='nombre-anio'>{jefe.nombre}</p>
                <span className='nombre-anio'>{jefe.period}</span>
                </div>
            </div>
        </div>
    )
}

JefeItem.propTypes = {
    jefe: PropTypes.object.isRequired,
    updateLightboxItem: PropTypes.func.isRequired
}