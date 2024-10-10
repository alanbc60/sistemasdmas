// import '../styles/elements/Lightbox.css'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


export function LightboxJefe({ lightboxItem, updateState }) {

    useEffect(()=> {
        const cerrarConEsc = (event)=> {
            if(event.code === 'Escape')
                updateState(null)
        };
        document.addEventListener('keydown', cerrarConEsc)
        return () => {
            document.removeEventListener('keydown', cerrarConEsc)
        }
    },[updateState])
    
    return (
        <section id='lightbox' className={`${lightboxItem ? 'block' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-80`}>
            {lightboxItem &&
                <article className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 w-full max-w-2xl text-center rounded-lg border-4 border-light-gray text-white overflow-y-scroll scrollbar-thin scrollbar-thumb-light-gray scrollbar-track-white">
                    <FontAwesomeIcon className="absolute top-5 right-5 w-10 text-light-gray cursor-pointer hover:text-gray-600 transition-colors duration-300" icon={faTimes} onClick={() => updateState(null)} />
                    {lightboxItem.nombre && <h3>{lightboxItem.nombre}</h3>}
                    {lightboxItem.period && <p>{lightboxItem.period}</p>}
                    <img className="rounded-lg my-3 w-4/5 max-w-sm mx-auto" src={lightboxItem.imgSrc} alt={`photo of ${lightboxItem.imgSrc}`} />
                    {lightboxItem.detalles && <p>{lightboxItem.detalles}</p>}
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

    useEffect(()=> {
        const cerrarConEsc = (event)=> {
            if(event.code === 'Escape')
                updateState(null)
        };
        document.addEventListener('keydown', cerrarConEsc)
        return () => {
            document.removeEventListener('keydown', cerrarConEsc)
        }
    },[updateState])

    return (
        <section className={`${imgSrc ? 'block' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-80`}>
            <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 w-11/12 h-11/12 text-center rounded-lg border-4 border-light-gray text-white">
                <FontAwesomeIcon className="absolute top-5 right-5 w-10 text-light-gray cursor-pointer hover:text-gray-600 transition-colors duration-300" icon={faTimes} onClick={() => updateState(null)} />
                {imgSrc && <img className="w-full h-full object-contain aspect-[3/2]" src={imgSrc} alt="Sin descripción" />}
            </figure>
        </section>
    )
}


LightboxImg.propTypes = {
    imgSrc: PropTypes.string,
    updateState: PropTypes.func.isRequired
}