import mailIcon from '../../../assets/icons/email.png';
import teamicon from '../../../assets/icons/team.png';
import { ButtonLink, ButtonNav } from '../../../elements/Buttons';
import bgImage from '../../../assets/backgrounds/bgbanner2.jpg';
import { useParams } from 'react-router-dom';

/**
 * 
 * @returns componente con información de la página, como redes sociales, logo, nombre y canal de youtube
 */

export default function InicioFooter() {
    const {section, categoria} = useParams()
    if(section||categoria) return null
    return(
        <footer id='section-footer' style={{backgroundImage:`url(${bgImage})`}}>
            <div className='section-footer-div'>
                <figure className='section-footer-icon-container'>
                    <img className='section-footer-icon' src={mailIcon} alt='icono de correo'/>
                </figure>
                <p className='section-footer-text'>¿Sugerencias?</p>
                <ButtonNav label={'Escríbenos'} path={'/sugerencias'}/>
            </div>
            <div className='section-footer-div'>
                <figure className='section-footer-icon-container'>
                    <img className='section-footer-icon' src={teamicon} alt='icono con tres dibujos de personas'/>
                </figure>
                <p className='section-footer-text'>Conoce a los integrantes del departamento</p>
                <ButtonLink label={'Integrantes del Departamento'} path={'http://dcni.cua.uam.mx/departamentos/matematicas#personal'}/>
            </div>
        </footer>
    )
}