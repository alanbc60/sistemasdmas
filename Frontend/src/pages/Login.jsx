import React from 'react';
import { useEffect } from 'react';
import LogoUAMsvg from '../assets/logos/uamlogo.svg';
import FormLogin from '../components/login/formLogin';

/**
 * 
 * @returns componente que renderiza al formulario no controlado y actualiza el titulo de la página
 * 
 */

export default function Login() {
    useEffect(() => {
        document.title = "Iniciar Sesión | DMAS";
    }, []);

    return (
        <section
            id="login-uam"
            className="grid place-items-center min-h-screen bg-fondologin text-white p-6"
        >
            <article
                id="login-container"
                className="grid place-items-center w-[90%] min-w-[400px] max-w-[400px] py-[70px] px-[30px] rounded-[20px] border border-[3px] border-orange-300 bg-white shadow-xl shadow-orange-600 text-black"
            >
                <header id="login-header">
                    <h1 className="font-medium text-[calc(1.325rem+0.9vw)] mb-14">
                        Inicio de sesión
                    </h1>
                </header>

                <FormLogin />

                <footer id="login-footer" className="mt-2 text-center text-lg w-[90%]">
                    <p className='pb-6'>Departamento de Matemáticas Aplicadas y Sistemas</p>
                    <div className='flex justify-center text center'>
                        <img className='max-w-[200px]' src={LogoUAMsvg} />
                    </div>

                </footer>

            </article>
        </section>
    );
}


