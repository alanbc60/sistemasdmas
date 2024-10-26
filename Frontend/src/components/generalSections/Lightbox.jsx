// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const lightboxPrincipal = 'fixed inset-0 z-10 w-full h-full';
const lightboxStyle = 'absolute p-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[800px] max-h-[675px] mx-auto text-center rounded-[25px] border-[4px] border-orange-uam bg-white/90 backdrop-blur-sm overflow-y-auto scrollbar-size-[10px] scrollbar-thumb-gray-300 scrollbar-track-blue-200';
const closeIcon = 'cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500';


export function LightboxImagen({ lightboxItem, updateState }) {

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
        <section id='lightbox poup-jefe' className={`${lightboxPrincipal} ${lightboxStyle}`} style={{ display: lightboxItem ? 'block' : 'none' }}>
            {lightboxItem &&
                <article className='grid place-item-center grid-cols-1'>
                    <div className='flex justify-end'>
                        <FontAwesomeIcon id='close-icon'
                            className={`${closeIcon}`}
                            icon={faTimes}
                            onClick={() => updateState(null)} />
                    </div>
                    {lightboxItem.nombre && <h3 className='text-[20px] font-bold'>{lightboxItem.nombre}</h3>}
                    {lightboxItem.period && <p>{lightboxItem.period}</p>}
                    <div className='flex justify-center py-3'>
                        <img
                            className='rounded-[50px] border-[4px] border-orange-uam'
                            src={lightboxItem.imgSrc}
                            alt={`photo of ${lightboxItem.imgSrc}`} />
                    </div>

                    {lightboxItem.detalles && <p>{lightboxItem.detalles}</p>}
                </article>
            }
        </section>
    )
}

LightboxImagen.propTypes = {
    lightboxItem: PropTypes.object,
    updateState: PropTypes.func.isRequired
}

