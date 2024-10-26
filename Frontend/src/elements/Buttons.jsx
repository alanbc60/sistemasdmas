import React from 'react';
import PropTypes from 'prop-types';
//import '../styles/elements/Buttons.css'
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @param {string} value
 *  texto para mostrar en el botón
 * @returns botón tipo submit
 */


export function ButtonNav({label, path}) {
    const navigate = useNavigate();
    return (
        <button className='grid place-items-center min-w-[200px] min-h-[50px] bg-orange-uam text-white m-2 px-4 py-2 rounded-md hover:bg-orange-300 transition-all duration-500' onClick={()=>navigate(path)}>{label}</button>
    )
  }
ButtonNav.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

/**
 * 
 * @param {label, path}  
 * label: texto para mostrar en el botón
 * path: dirección a la cual redireccional 
 * @returns boton para navegar externamente
 */

export function ButtonLink({label, path}) {
    return (
        <a className='grid place-items-center min-h-[50px] bg-orange-uam text-white m-2 px-4 py-2 rounded-md hover:bg-orange-300 transition-all duration-500' href={path} target="_blank" rel='noreferrer'>Ver {label}</a>
    )
  }
ButtonLink.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}
  