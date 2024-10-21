// import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom"
import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faUsersGear , faUserPlus } from '@fortawesome/free-solid-svg-icons';
import  LogoUAM  from '../../../assets/logos/uamLogo.png';
import  LogoUsuario  from '../../../assets/logos/perfil.png';
import '../../../styles/elements/Footer.css'


function InicioAdmin() {
  const location = useLocation();
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-2/12 bg-orange-uam px-2 py-5 relative">
      <div className="col d-flex flex-column justify-content-center align-items-center">
        <img src={LogoUsuario} alt="Icono Usuario" style={{ height: '8rem'}}/>
        <h2 className="text-2xl font-black text-white text-center"> ADMINISTRADOR</h2>

        <nav className="">
          {/* si la ruta es "/" se le asigna el color blue-300, si no se le asigna el color white */}
          <Link
            className={`${location.pathname === '/admin' ? 'text-gray-400' : 'text-white'} text-xl block mb-4 mt-5 hover:text-gray-500 `}
            to="/admin"
          >
            <FontAwesomeIcon icon={faUsersGear} className="px-2"/>
            Lista de usuarios
          </Link>
          <Link
            className={`${location.pathname === '/admin/usuarios/nuevoUsuario' ? 'text-gray-400'  : 'text-white'} text-xl block mb-4 hover:text-gray-500 `}
            to="usuarios/nuevoUsuario"
          >
            <FontAwesomeIcon icon={faUserPlus} className="px-2 "/>
            Nuevo Usuario
          </Link>

          {/* Cerrar sesión */}
          <Link
            className={`${location.pathname === '/admin/regresar' ? 'text-gray-400'  : 'text-white'} text-xl block mb-5 hover:text-gray-500 `}
            to="/regresar"
          >
            <FontAwesomeIcon icon={faCircleLeft} className="px-2"/>
            Regresar al home
          </Link>
        </nav>

        <img src={LogoUAM} alt="Casa Abierta al Tiempo" style={{ height: '4rem'}} className="absolute bottom-0 mb-3"/>
      </div>
        
      </aside>

      <main className="md:w-10/12 bg-gray-100 md:h-screen overflow-scroll ">
        {/* cuando el usuario va a "/usuarios/nuevoUsuario", se renderizará el componente asociado con esa ruta dentro del Outlet. */}
        <Outlet />
      </main>

      

    </div>

    
  )
}


const mapStateToProps = (state) =>{
  return{
      usernameId: state.usernameId,
      logged: state.logged,
  };
};

const mapDispatchToProps ={
  toggleLogin,
};


const ConnectedInicioAdmin = connect(mapStateToProps, mapDispatchToProps)(InicioAdmin);
export default ConnectedInicioAdmin;

