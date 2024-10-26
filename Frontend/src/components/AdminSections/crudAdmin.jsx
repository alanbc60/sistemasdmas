import React from 'react';
import { useState, useEffect } from 'react';
import Usuario from '../../components/AdminSections/Usuario';
import { AdminLoader } from '../../hooks/useAdmin';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toggleLogin from '../../redux/actions/toggleLogin';
import { host } from '../../data/host';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
//import { GridConteiner } from '../../../elements/Grid';

function CrudAdmin(props) {
  //const [setNoResultMessage] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginal, setUsuariosOriginal] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;
  //const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;


  const goToHome = () => {
    navigate("/")
  }

  const sessionBtn = () => {
    Swal.fire({
      title: 'Terminará tu sesión actual',
      text: '¿Está seguro que desea terminar su sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (props.logged) {
          console.log("entro a la validacion session encontrada");
          try {       
            const getLogout = async () => {
              const response = await axios.post(host + ":3001/post/logout")
              const result = response.data
              console.log(result)
              props.toggleLogin(false)
            }
            getLogout();
    
          } catch (error) {
            console.log(error.message)
          } finally {
            //setLogoutLoading(false)
            goToHome();
          }
        }
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdminLoader();
        setUsuarios(data);
        setUsuariosOriginal([...data]); // Almacena una copia de la lista original
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtra la lista original cuando cambia usuariosOriginal
    handleSearch({ target: { value: '' } });
  }, [usuariosOriginal]);

  const records = usuarios.slice((paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);
  const npages = Math.ceil(usuarios.length / registrosPorPagina);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const handlePrevClick = (e) => {
    if (paginaActual > 1) {
      e.preventDefault();
      setPaginaActual(paginaActual - 1);
    }

  };

  const handlePageClick = (number, e) => {
    e.preventDefault();
    setPaginaActual(number);
  };

  const handleNextClick = (e) => {
    if (paginaActual < npages) {
      e.preventDefault();
      setPaginaActual(paginaActual + 1);
    }

  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setPaginaActual(1);

    if (keyword !== '') {
      const results = usuariosOriginal.filter((usuario) => {
        const revisarPalabra = (prop) => prop && prop.toLowerCase().includes(keyword);
        return (
          revisarPalabra(usuario.nombre) ||
          revisarPalabra(usuario.apaterno) ||
          revisarPalabra(usuario.amaterno) ||
          revisarPalabra(usuario.mail)
        );
      });

      if (results.length > 0) {
        setUsuarios(results);
        //setNoResultMessage('');
      } else {
        console.log("No se encontraron resultados para '" + keyword + "'");
        //setNoResultMessage(`No se encontraron resultados para '${keyword}'`);
      }
    } else {
      // Restablece a la lista original de usuarios almacenada
      console.log("No hay letras para buscar");
      setUsuarios([...usuariosOriginal]);
      //setNoResultMessage('');
    }
  };

  const pagBtnStyle = 'py-1 px-2 border bg-orange-uam text-white rounded-md shadow-lg hover:shadow-md hover:bg-orange-400';
  const inputStyle = 'bg-white w-full h-15 p-4 border border-[1px] border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-500';

  return (
    <>
      <div id='top-nav-adm' className='min-w-[500px] grid md:grid-cols-[5fr_1fr] grid-cols-1 p-6'>

        <div id='titulo-nav-container-adm' className='flex justify-center py-2'>
          <h1 className="font-black text-4xl text-orange-500 text-center z-1">Usuarios DMAS</h1>
        </div>


        <div id='session-nav-container-adm' className='p-2 flex justify-center' >
          <button className='min-w-[150px] p-2 text-orange-500 font-bold rounded-2xl hover:shadow-sm hover:text-gray-400 transition-all duration-500' onClick={sessionBtn}>
            <span >Cerrar sesión </span>
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
              className={`${inputStyle}`}
              onChange={handleSearch}
            />
          </div>


          <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className='bg-orange-uam text-white'>
              <tr>
                <th className='p-2'>ID</th>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Apellido Paterno</th>
                <th className='p-2'>Apellido Materno</th>
                <th className='p-2'>correo</th>
                <th className='p-2'>Password</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {records.map(usuario => (
                <Usuario
                  usuario={usuario}
                  key={usuario.idusuario}
                />
              ))}
            </tbody>
          </table>

          <nav className='mt-10 flex justify-between w-full'>
            <ul className='flex'>
              <li className="pr-1">
                <button className={`${pagBtnStyle}`} onClick={handlePrevClick}>Anterior</button>
              </li>
              {numbers.map(number => (
                <li className={paginaActual === number ? 'page-item active px-1' : 'page-item'} key={number}>
                  <button
                    className={`${pagBtnStyle}`}
                    onClick={(e) => handlePageClick(number, e)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li className="pl-1">
                <button className={`${pagBtnStyle}`} onClick={handleNextClick}>Siguiente</button>
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

const mapStateToProps = (state) => {
  return {
    logged: state.logged,
  };
};

const mapDispatchToProps = {
  toggleLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(CrudAdmin);
//export default CrudAdmin;
