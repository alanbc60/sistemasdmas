import expandIcon from '../../assets/icons/expandir.png'
import PropTypes from 'prop-types';
import defaultDocumento from '../../assets/defaultimages/defaultDocumento.png'

/**
 * 
 * @param {string, bool} 
 * imageSrc: dirección src de una imagen
 * updateLighboxOpen: actualiza el estado del lightboxOpen del padre 
 * @returns componente que muestra una imagen y si se da click en el boton, muestra el lightbox 
 */
export const CoverImage = ({imageSrc, updateLightboxOpen}) =>{
    return(
        <div id="cover-image"
            className='flex flex-col items-center relative w-full mb-[24px] min-w-[500px] h-[300px] bg-cover bg-center bg-no-repeat'
            style={{backgroundImage:`url(${imageSrc})`}}>
            <div className="filter">
                <button className='absolute bottom-[24px] right-[24px] p-2' onClick={()=>updateLightboxOpen(imageSrc)}>
                    <img className="expand" src={expandIcon} />
                </button>
            </div>
        </div>
    )
}
CoverImage.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    updateLightboxOpen: PropTypes.func.isRequired,
}

/**
 * 
 * @param {string} 
 * titulo: titulo que se quiere mostrar en el documento PDF
 * pdfSrc: direccion src del pdf que se quiere mostrar 
 * @returns 
 */
export const CoverPDF = ( {titulo, pdfSrc})=>{
    return(
        <>
        {pdfSrc?
            <figure id="cover-pdf">
                <iframe title={titulo} src={pdfSrc} type='application/pdf'>Documento</iframe>
            </figure>
            :
            <div id="cover-image" style={{backgroundImage:`url(${defaultDocumento})`}}>
                <div className="filter"></div>
            </div>
        }
        </>
    )
}

CoverPDF.propTypes = {
    titulo: PropTypes.string.isRequired,
    pdfSrc: PropTypes.string,
}