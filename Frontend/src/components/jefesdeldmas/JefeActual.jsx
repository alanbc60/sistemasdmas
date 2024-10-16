// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { jefesdeldmas } from '../../data/sections';
import noImg from '../../assets/jefesdeldmas/default.png';

/**
 * 
 * @param {func} 
 *  updateLightboxItem función que actualiza el estado del lightbox del padre
 * @returns componente con informacion del jefe actual tomada desde un arreglo en la carpeta data
 */
export default function JefeActual({updateLightboxItem}) {
    const handleClick = (item)=>{
        updateLightboxItem(item)
    }
    return(
        <aside id='jefeactual' className='flex flex-col items-center'>
            <h3 id='jefe-title' className='text-2xl mb-8 font-bold text-center'>Jefe Actual</h3>
            <figure id='jefeactual-container-img' className='page-content relative max-w-[275px] max-h-[275px] bg-gradient-to-br from-orange-400 via-yellow-200 to-yellow-200 rounded-full flex items-center justify-center cursor-pointer bg-opacity-50' >
                <button className='button container flex justify-center' onClick={()=>handleClick(jefesdeldmas[0])}>
                    <img id='jefeactual-photo' className='h-[90%] w-[90%] rounded-full aspect-square aspect-[3/2] object-contain hover:scale-110' src={jefesdeldmas[0].imgSrc?jefesdeldmas[0].imgSrc: noImg}/>
                </button>
            </figure>
            <p id='jefeactual-name'>{jefesdeldmas[0].nombre}</p>
            <p id='jefeactual-period'>{jefesdeldmas[0].period}</p>
        </aside>
    )
}

JefeActual.propTypes = {
    updateLightboxItem: PropTypes.func.isRequired
}
