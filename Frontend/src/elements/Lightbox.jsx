import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const lightboxStyle = 'fixed inset-0 z-10 w-full h-full';
const lightboxJefe = 'absolute p-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[800px] max-h-[675px] mx-auto text-center rounded-lg border-[4px] border-orange-uam bg-white/90 backdrop-blur-sm overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white';
const closIcon = 'cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500';


export function LightboxJefe({ lightboxItem, updateState }) {

    useEffect(() => {
        const cerrarConEsc = (event) => {
            if (event.code === 'Escape')
                updateState(null)
        };
        document.addEventListener('keydown', cerrarConEsc)
        return () => {
            document.removeEventListener('keydown', cerrarConEsc)
        }
    }, [updateState])



    return (
        <section id='lightbox poup-jefe' className={`${lightboxStyle} ${lightboxJefe}`} style={{ display: lightboxItem ? 'block' : 'none' }}>
            {lightboxItem &&
                <article className='grid place-item-center grid-cols-1'>
                    <div className='flex justify-end'>
                        <FontAwesomeIcon id='close-icon'
                            className={`${closIcon}`}
                            icon={faTimes}
                            onClick={() => updateState(null)} />
                    </div>
                    {lightboxItem.nombre && <h3>{lightboxItem.nombre}</h3>}
                    {lightboxItem.period && <p>{lightboxItem.period}</p>}
                    <div className='flex justify-center py-3'>
                        <img
                            src={lightboxItem.imgSrc}
                            alt={`photo of ${lightboxItem.imgSrc}`} />
                    </div>

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
    useEffect(() => {
        const cerrarConEsc = (event) => {
            if (event.code === 'Escape')
                updateState(null)
        };
        document.addEventListener('keydown', cerrarConEsc)
        return () => {
            document.removeEventListener('keydown', cerrarConEsc)
        }
    }, [updateState])
    return (
        <section id='popup-img' className={`${lightboxStyle}`} style={{ display: imgSrc ? 'block' : 'none' }}>
            <figure>

                <FontAwesomeIcon icon={faTimes} onClick={() => updateState(null)} />
                {imgSrc &&
                    <img src={imgSrc} alt='Sin descripción' />
                }
            </figure>
        </section>
    )
}
LightboxImg.propTypes = {
    imgSrc: PropTypes.string,
    updateState: PropTypes.func.isRequired
}
