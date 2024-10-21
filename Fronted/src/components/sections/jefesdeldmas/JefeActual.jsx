import PropTypes from 'prop-types';
import { jefesdeldmas } from '../../../data/sections';
import noImg from '../../../assets/jefesdeldmas/default.png';

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
        <aside id='jefeactual' >
            <h3 className='jefe-title'>Jefe Actual</h3>
            <figure id='jefeactual-container-img' className='page-content' >
                <button className='button container' onClick={()=>handleClick(jefesdeldmas[0])}>
                    <img id='jefeactual-photo' src={jefesdeldmas[0].imgSrc?jefesdeldmas[0].imgSrc: noImg}/>
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
