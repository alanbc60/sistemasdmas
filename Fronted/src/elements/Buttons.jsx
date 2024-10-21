import PropTypes from 'prop-types';
import '../styles/elements/Buttons.css'
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @param {string} value
 *  texto para mostrar en el botón
 * @returns botón tipo submit
 */
export function SubmitInput({value}) {
  return (
    <input type="submit" value={value} className="button-submit"/>
  )
}
SubmitInput.propTypes = {
    value: PropTypes.string.isRequired,
}

/**
 * 
 * @param {string} 
 * label: texto para mostrar en el botón
 * path: dirección a la cual redireccional 
 * @returns botón que sirve para navegar internamente
 */
export function ButtonNav({label, path}) {
    const navigate = useNavigate();
    return (
        <button className='button-nav' onClick={()=>navigate(path)}>{label}</button>
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
        <a className='button-link' href={path} target="_blank" rel='noreferrer'>Ver {label}</a>
    )
  }
ButtonLink.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}
  