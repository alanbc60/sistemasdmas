// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import Usuario from './Usuario';
import { AdminLoader } from '../../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toggleLogin from '../../redux/actions/toggleLogin';
import { host } from '../../data/host';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function CrudAdmin(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;
  const navigate = useNavigate();

  // Paginación
  const records = usuarios.slice(
    (paginaActual - 1) * registrosPorPagina, 
    paginaActual * registrosPorPagina
  );
  const npages = Math.ceil(usuarios.length / registrosPorPagina);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  // Configurar axios con credenciales
  axios.defaults.withCredentials = true;

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdminLoader();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  const goToHome = () => navigate("/");

  const sessionBtn = () => {
    Swal.fire({
      title: 'Terminará tu sesión actual',
      text: '¿Está seguro que desea terminar su sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed && props.logged) {
        try {
          const response = await axios.post(`${host}:3001/post/logout`);
          console.log(response.data);
          props.toggleLogin(false);
        } catch (error) {
          console.error(error.message);
        } finally {
          goToHome();
        }
      }
    });
  };

  // Búsqueda de usuarios
  const handleSearch = useCallback((e) => {
    const keyword = e.target.value.toLowerCase();
    setPaginaActual(1);

    if (keyword) {
      const results = usuarios.filter((usuario) =>
        ['nombre', 'apaterno', 'amaterno', 'mail'].some((key) =>
          usuario[key]?.toLowerCase().includes(keyword)
        )
      );
      setUsuarios(results);
    } else {
      console.log("No hay letras para buscar");
      // Recargar usuarios en caso de que no haya búsqueda
      const fetchData = async () => {
        try {
          const data = await AdminLoader();
          setUsuarios(data);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };
      fetchData();
    }
  }, [usuarios]);

  // Manejo de la paginación
  const handlePrevClick = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handlePageClick = (number) => setPaginaActual(number);

  const handleNextClick = () => {
    if (paginaActual < npages) setPaginaActual(paginaActual + 1);
  };

  return (
    <>
      <div id="top-nav-adm" className="min-w-[500px]">
        <div id="titulo-nav-container-adm" className="flex items-center justify-center">
          <h1 className="font-black text-4xl text-orange-500 text-center z-1">
            Usuarios DMAS
          </h1>
        </div>

        <div id="session-nav-container-adm" className="flex justify-center">
          <button className="session-btn-adm" onClick={sessionBtn}>
            <span>Cerrar sesión </span>
            <FontAwesomeIcon icon={faCircleUser} />
          </button>
        </div>
      </div>

      {usuarios.length ? (
        <>
          <div className="flex justify-center p-1">
            <input
              type="text"
              placeholder="Buscar usuario"
              className="w-full p-2 mt-5 rounded-md border-2 transition duration-300 ease-in-out bg-white focus:border-blue-500 focus:outline-none"
              onChange={handleSearch}
              style={{
                borderRadius: '10px',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                boxShadow:
                  '2px 2px 2px rgba(0, 0, 0, 0.08), -3px -2px 3px rgba(255, 255, 255, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.08) inset',
              }}
            />
          </div>

          <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-orange-uam text-white">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido Paterno</th>
                <th className="p-2">Apellido Materno</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Password</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {records.map((usuario) => (
                <Usuario key={usuario.idusuario} usuario={usuario} />
              ))}
            </tbody>
          </table>

          <nav className="mt-10 lg:flex lg:justify-between">
            <ul className="flex items-center">
              <li className="mr-2 page-item">
                <button
                  className="p-1 px-2 border bg-orange-uam text-white rounded-md shadow-md hover:bg-orange-400"
                  onClick={handlePrevClick}
                >
                  Anterior
                </button>
              </li>
              {numbers.map((number) => (
                <li
                  className={paginaActual === number ? 'page-item active' : 'page-item'}
                  key={number}
                >
                  <button
                    className="p-1 px-2 border bg-orange-uam text-white rounded-md shadow-md hover:bg-orange-400"
                    onClick={() => handlePageClick(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="p-1 px-2 border bg-orange-uam text-white rounded-md shadow-md hover:bg-orange-400"
                  onClick={handleNextClick}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <p className="text-center mt-10">No Hay Usuarios aún</p>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  logged: state.logged,
});

const mapDispatchToProps = { toggleLogin };

const ConnectedCrudAdmin = connect(mapStateToProps, mapDispatchToProps)(CrudAdmin);
export default ConnectedCrudAdmin;
