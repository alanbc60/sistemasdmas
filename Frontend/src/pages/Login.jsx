import { useEffect } from 'react';
import  '../assets/logos/uamlogo.svg';
import FormLogin from '../components/login/FormLogin';

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
      className="grid place-items-center min-h-screen bg-[url('../../assets/backgrounds/endless-constellation.svg')] text-white p-6"
    >
      <article
        id="login-container"
        className="grid place-items-center w-[90%] max-w-[25rem] p-16 pt-14 rounded-2xl border border-uam-light bg-white shadow-lg text-black"
      >
        <header id="login-header">
          <h1 className="font-medium text-[calc(1.325rem+0.9vw)] mb-14">
            Inicio de sesión
          </h1>
        </header>
        <FormLogin />
        <footer id="login-footer" className="mt-2 text-center text-lg w-[90%]">
          <p>Departamento de Matemáticas Aplicadas y Sistemas</p>
          {/* <LogoUAM width="200px" /> */}
        </footer>
      </article>
    </section>
  );
}
