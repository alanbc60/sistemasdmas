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
    const columna = 'grid place-item-center grid-rows-1/3 gap-4 relative';

    return(
        <article id='jefes-anteriores-container' className="">
            <h3 className='jefe-title'>Jefaturas Anteriores del DMAS</h3>
            <div id='jefes-anteriores-content' className="grid md:grid-cols-[1fr_1.1fr]  gap-4">
                <div id='columna' className={`${columna} `} >
                    {column1Jefes.map((jefe, index) => (
                        <JefeItem jefe={jefe} key={`${index}-col1`} updateLightboxItem={updateLightboxItem}/>
                    ))}
                    <div className='column-gold'></div>
                </div>
                <div id='columna' className={`${columna} `} >
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


