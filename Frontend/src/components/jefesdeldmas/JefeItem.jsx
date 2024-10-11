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
export default function JefeItem({ jefe, updateLightboxItem }) {
    const handleClick = (item) => {
        updateLightboxItem(item)
    }

    return (
        <div id='jefe-item-container' className=' w-[200px]'>
            <div id='jefe-item-info' className='grid grid-cols-2 place-items-center'>
                <figure id='jefe-item-figure' className='col-span-1 relative w-[100px] h-[100px]  bg-gradient-to-br from-yellow-400 to-yellow-300 z-10 rounded-full' onClick={() => handleClick(jefe)}>
                    <button id='button-container' className='flex justify-center items-center bg-transparent border-none w-full h-full'>
                        <img id='jefe-item-img' className='h-[90%] w-[90%] bg-cover bg-center bg-no-repeat aspect-[3/2] object-contain hover:scale-110 rounded-full aspect-square aspect-[3/2]' alt={`foto de ${jefe.nombre}`} src={jefe.imgSrc ? jefe.imgSrc : noImg} />
                    </button>
                </figure>
                <div id='jefe-item-desc' className='px-[10px] col-span-1'>
                    <p id='nombre-anio' className='text-left text-[12px]'>{jefe.nombre}</p>
                    <span id='nombre-anio' className='text-[10px]'>{jefe.period}</span>
                </div>
            </div>
        </div>
    )
}

JefeItem.propTypes = {
    jefe: PropTypes.object.isRequired,
    updateLightboxItem: PropTypes.func.isRequired
}
