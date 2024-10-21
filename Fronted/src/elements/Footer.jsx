
import '../styles/elements/Footer.css'
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  LogoUAM  from '../assets/logos/uamLogo.png';

export default function Footer() {
  return (
    <footer id='footer'>
        <div id='enlaces-logo'>
            <div id='enlaces-footer'>
                <div id='enlaces-footer-container'>
                    <h5>Departamento de Matem&aacute;ticas Aplicadas y Sistemas</h5>
                    <p>Universidad Aut&oacute;noma Metropolitana</p>
                    <p>Unidad Cuajimalpa</p>
                    <ul id='enlaces-list'>
                        <li><a className="link" href='https://www.facebook.com/dmas.uamcuajimalpa.5' rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebook} /> DMAS</a></li>
                        <li><a className="link" href='https://www.facebook.com/MateAplicadas' rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebook} /> Matem&aacute;ticas Aplicadas</a></li>
                        <li><a className="link" href='https://www.facebook.com/IngComputacionUAMC' rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebook} /> Ingenier&iacute;a en Computaci&oacute;n</a></li>
                        <li><a className="link" href='https://www.youtube.com/@DMASUAMCuajimalpa' rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faYoutube} /> Canal de Youtube</a></li>                    
                    </ul>
                </div>
            </div>
            <div id='logo-footer'>
                <img src={LogoUAM} alt="Casa Abierta al Tiempo" className="logo-uam"/>
                
            </div>
        </div>
        <div id='label-footer'>UAM CUAJIMALPA</div>
    </footer>
  )
}
