import React from 'react';
import { useParams } from 'react-router-dom'
import { useVerItem } from '../../hooks/useCategorias';
import { Loading } from '../../components/generalSections/Loading';
import NoResults from '../../elements/NoResults';
import LatexRenderer from '../../elements/LatexRenderer';
import { CoverImage } from '../../components/categorySections/Cover';
import DisplayYoutube from '../../components/categorySections/DisplayYoutube';
import filterType from '../../data/dropdownType.json';
// import '../../styles/components/VerItem.css'
import { useState } from 'react';
import { LightboxImagen } from '../../components/generalSections/Lightbox';
import { ButtonLink, ButtonNav } from '../../elements/Buttons';
import Header from '../../components/generalSections/Header';
// import HeaderSection from '../../components/generalSections/HeaderSection';
import Footer from '../../components/generalSections/Footer';
// import { useLayoutData } from "../../hooks/useLayoutData";


/**
 * 
 * @returns Componente que muestra el contenido detallado de un item, dependiendo de la categoria mostrará diferente contenido.
 * Por ejemplo si se necesita mostrar latex o Video. además de cambiar las palabras o frases de cada header dependiendo la categoria
 * el contenido que mostrará lo obtiene del customhook useVerItem que esta en useCategorias.
 */
export default function VerItem() {

    console.log("=== ENTRO a VerItem ===")
    const [lightboxOpen, setLightboxOpen] = useState(null)

    const updateLightboxOpen = (newItem) => {
        setLightboxOpen(newItem)
    }
    const { categoria, item } = useParams();

    console.log("CATEGORIA: " + categoria);
    console.log("ITEM: " + item);

    const { data, loadingVer } = useVerItem(categoria, item)
    const hasLatex = !(categoria === 'eventos' || categoria === 'lineamientosproc')
    const hasVideo = (categoria === 'seminarios' || categoria === 'proyectosterminales')
    const headers = {
        headerParticipantes:
            categoria === 'proyectosinvestigacion' ? 'Participantes' : 'Autores',
        headerFecha:
            categoria === 'publicaciones' ? 'Año: ' :
                categoria === 'proyectosinvestigacion' ? 'Fecha de inicio: ' :
                    categoria === 'proyectosterminales' ? 'Fecha de publicación: ' : 'Fecha: ',
        headerParrafo1:
            (categoria === 'publicaciones' || categoria === 'seminarios') ? 'Resumen' :
                (categoria === 'proyectosterminales' || categoria === 'proyectosinvestigacion') ? 'Objetivo' :
                    'Descripción',
        headerParrofo2:
            categoria === 'eventos' ? '¿Dónde?' :
                categoria === 'proyectosterminales' ? 'Resumen' : 'Semblanza'
    }
    const textLink =
        categoria === 'lineamientosproc' ? 'Documento' :
            categoria === 'proyectosinvestigacion' ? 'Proyecto de Investigación' : 'Publicación'

    const procesarFecha = (fecha) => {
        if (fecha) {
            const formatoAnio = /^\d{4}$/;
            if (formatoAnio.test(fecha)) {
                return fecha
            } else {
                const dateObject = new Date(fecha);
                return '' + dateObject.getUTCDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
            }
        } else {
            return null
        }
    }
    return (

        <>
            <Header />
            {loadingVer ? <Loading /> :
                <section id='ver-section'>
                    {data &&
                        <CoverImage imageSrc={data.archivo} updateLightboxOpen={updateLightboxOpen} />
                    }
                    <article id='ver-info'>
                        <div className='back-container'>
                            <ButtonNav label='Regresar' path={`/${categoria}`} />
                        </div>
                        {data ?
                            <>  
                            <div className='p-5'>
                                {data.titulo && <h1 className='ver-titulo text-4xl font-bold'>{data.titulo}</h1>}
                                {data.responsables &&
                                    <p className='text-sm'>{data.responsables}</p>
                                }
                            </div>

                            <div className='p-5'>
                                {data.parrafo1 &&
                                    <>
                                        <h3 className='ver-header'>{headers.headerParrafo1}</h3>
                                        {hasLatex ?
                                            <LatexRenderer content={data.parrafo1} />
                                            :
                                            <p className='ver-text'>{data.parrafo1}</p>
                                        }
                                    </>
                                }
                                {data.parrafo2 &&
                                    <>
                                        <h3 className='ver-header'>{headers.headerParrofo2}</h3>
                                        {hasLatex ?
                                            <LatexRenderer content={data.parrafo2} />
                                            :
                                            <p className='ver-text'>{data.parrafo2}</p>
                                        }
                                    </>
                                }
                            </div>

                            <div className='p-5'>
                                {data.participantes &&
                                    <>
                                        <h3 className='ver-header'>{headers.headerParticipantes}</h3>
                                        <p className='ver-text'>{data.participantes}</p>
                                    </>
                                }
                                {data.fecha &&
                                    <p className='ver-text'><strong>{headers.headerFecha}</strong>{procesarFecha(data.fecha)}</p>
                                }
                                {data.fechaActualizacion &&
                                    <p className='ver-text'><strong>Fecha de término:</strong> {procesarFecha(data.fechaActualizacion)}</p>
                                }
                                {data.tipo &&
                                    <h3 className='ver-text'><strong>Tipo:</strong> {filterType.find((e) => (e.type === data.tipo)).filtro}</h3>
                                }
                                {data.enlace &&
                                    <ButtonLink label={textLink} path={data.enlace} />
                                }
                                {hasVideo &&
                                    <div className='w-full justify-content-center  '>
                                        <h3 className='ver-header '>Video</h3>
                                            <DisplayYoutube videoSrc={data.youtube} />
                                    </div>
                                }
                            </div>
       


                            </>
                            : <NoResults />
                        }
                    </article>
                    <LightboxImagen imgSrc={lightboxOpen} updateState={updateLightboxOpen} />
                </section>
            }
            <Footer />
        </>
    )
}