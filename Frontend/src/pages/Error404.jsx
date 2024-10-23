'../../assets/logos/uamlogo.svg';
import React from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
/**
 * 
 * @returns Componente auxiliar en caso de querer visitar una ruta que no existe, pero que es una ruta válida.
 */
export default function Error404() {
    const navigate = useNavigate();
    useEffect(() => {
        
        document.title = 'Error 404 | DMAS'
        const timeout = setTimeout(() => {
          navigate('/');
        });
    
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
    <div id="error-page">
        <header>
            <h1>¡Error 404: Página no encontrada!</h1>
            <p>Serás redirigido a la página principal en breve.</p>
        </header>
        <div className="robot">
            <div className="neck"></div>
            <div className="arms">
                <div className="arm arm_left"></div>
                <div className="arm arm_right"></div>
            </div>
            <div className="torso">
                {/* <img src={LogoUAM} alt="User Icon" /> */}
            </div>
            <div className="head">
                <div className="eyes">
                    <div className="eyeball eyeball_left">
                        <div className='eye-pupil'></div>
                    </div>
                    <div className="eyeball eyeball_right">
                        <div className='eye-pupil'></div>
                    </div>
                </div>
                <div className="mouth">
                    <div className="mouth-container">
                        <div className="mouth-container-line" data-text="xxxxxxxxxxxxxx"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}