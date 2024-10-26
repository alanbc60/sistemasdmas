import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom"
import toggleLogin from '../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faUsersGear, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import LogoUAM from '../../assets/logos/uamlogo.png';
import LogoUsuario from '../../assets/logos/perfil.png';

function InicioAdmin() {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Menú lateral */}
      <aside className="w-2/12 bg-orange-500 py-5 text-white relative">
        <div className="flex flex-col items-center justify-center">
          <img src={LogoUsuario} alt="Casa Abierta al Tiempo" className="h-24" />
          <h2 className="text-xl mt-4">ADMINISTRADOR</h2>
        </div>

        <nav className="mt-10">
          <Link
            className={`text-xl block mb-4 ${
              location.pathname === '/admin' ? 'text-gray-400' : 'text-white'
            } hover:text-gray-500`}
            to="/admin"
          >
            <FontAwesomeIcon icon={faUsersGear} className="px-2" />
            Lista de usuarios
          </Link>

          <Link
            className={`text-xl block mb-4 ${
              location.pathname === '/admin/usuarios/nuevoUsuario' ? 'text-gray-400' : 'text-white'
            } hover:text-gray-500`}
            to="/admin/usuarios/nuevoUsuario"
          >
            <FontAwesomeIcon icon={faUserPlus} className="px-2" />
            Nuevo Usuario
          </Link>

          <Link
            className={`text-xl block mb-5 ${
              location.pathname === '/admin/regresar' ? 'text-gray-400' : 'text-white'
            } hover:text-gray-500`}
            to="/"
          >
            <FontAwesomeIcon icon={faCircleLeft} className="px-2" />
            Regresar al home
          </Link>
        </nav>

        <div className="absolute bottom-5 left-5">
          <img src={LogoUAM} alt="Casa Abierta al Tiempo" className="h-12" />
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="w-10/12 bg-gray-100 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    usernameId: state.usernameId,
    logged: state.logged,
  };
};

const mapDispatchToProps = {
  toggleLogin,
};


const ConnectedInicioAdmin = connect(mapStateToProps, mapDispatchToProps)(InicioAdmin);
export default ConnectedInicioAdmin;
