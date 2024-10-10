import React from "react";
import JefeItem from "./JefeItem";
import { jefesdeldmas } from '../../data/sections';
import PropTypes from 'prop-types';

/**
 * 
 * @param {func} 
 * updateLightboxItem funcion que actualiza el estado del padre 
 * @returns componente que sirve para renderizar a cada uno de los jefes anteriores del departamento
 */

export default function JefesAnteriores({updateLightboxItem}) {
    const column1Jefes = jefesdeldmas.slice(1, Math.floor(jefesdeldmas.length / 2) + 1);
    const column2Jefes = jefesdeldmas.slice(Math.floor(jefesdeldmas.length / 2) + 1);
    return(
        <article id='jefes-anteriores-container'>
            <h3 className='jefe-title'>Jefaturas Anteriores del DMAS</h3>
            <div id='jefes-anteriores-content'>
                <div className='columna'>
                    {column1Jefes.map((jefe, index) => (
                        <JefeItem jefe={jefe} key={`${index}-col1`} updateLightboxItem={updateLightboxItem}/>
                    ))}
                    <div className='column-gold'></div>
                </div>
                <div className='columna'>
                    {column2Jefes.map((jefe, index) => (
                        <JefeItem jefe={jefe} key={`${index}-col2`} updateLightboxItem={updateLightboxItem}/>
                    ))}
                    <div className='column-gold'></div>
                </div>
            </div>
        </article>
    )
}

JefesAnteriores.propTypes = {
    updateLightboxItem: PropTypes.func.isRequired
}


