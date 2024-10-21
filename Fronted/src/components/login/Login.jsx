import { useEffect } from 'react';
import FormLogin from './FormLogin';
import '../../styles/components/Login.css'
/**
 * 
 * @returns componente que renderiza al formulario no controlado y actualiza el titulo de la página
 * 
 */
export default function Login() {

  useEffect(()=>{
    document.title = "Iniciar Sesión | DMAS"
  }, []);
  
  return (
    <section id='login-uam'>
      <article id='login-container'>
        <header id='login-header'>
          <h1 >Inicio de sesión</h1>
        </header>
        <FormLogin/>
        <footer id='login-footer'>
          <p>Departamento de Matematicas Aplicadas y Sistemas</p>
          {/* <LogoUAM width='200px'/> */}
        </footer>
      </article>
    </section>
  )

}
