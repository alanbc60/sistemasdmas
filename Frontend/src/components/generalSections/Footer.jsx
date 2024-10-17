import React from 'react'
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoUAM from '../../assets/logos/uamlogo.png';

function Footer() {
    return (
        <footer id='footer' className="bg-orange-uam py-1 min-w-[500px]">
            <div id='enlaces-logo' className='grid sm:grid-col-1 md:grid-cols-2 lg:grid-col-2 items-center bg-orange-uam m-2 text-white'>
                <div id='enlaces-footer' className="flex flex-col items-center w-full p-5">
                    <div >
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

                <div id='logo-footer' className="flex flex-col items-center p-5">
                    <img src={LogoUAM} alt="Casa Abierta al Tiempo" className="max-w-[19rem] h-auto overflow-hidden" />
                </div>
            </div>


            <div id='label-footer' className='place-items-center text-center w-full bg-red-800 opacity-30 text-orange-uam p-2'>UAM CUAJIMALPA</div>

        </footer>
    )
}


export default Footer
