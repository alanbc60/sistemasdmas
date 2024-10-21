// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars, faUserTie, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {  sections, categorias } from '../../data/sections.js';
import axios from 'axios';
import { host } from '../../data/host';
import { useDispatch, useSelector } from 'react-redux';
import toggleLogin from '../../redux/actions/toggleLogin';
import { ShortLoading } from '../../elements/Loading';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';


// datos de entrada

function Header() {

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [menuHamburguerOpen, setMenuHamburguerOpen] = useState(false); // Estado para manejar el menú hamburguesa
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0)
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  // Acceder al estado global del usuario logueado
  const logged = useSelector((state) => state.logged); // Accede al reducer 'logged'
  console.log("Estado del usuario: ", logged.state)

  axios.defaults.withCredentials = true;

  useEffect(() => {

    // actualizar el indice de la sección activa
    const path = location.pathname;
    const index = sections.findIndex((section) => `/${section.to}` === path);
    if (index !== -1) {
      setActiveIndex(index);
    }


    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, location.pathname]);

  const handleClickCategories = () => {
    setIsOpen(!isOpen);
  };

  const goToLogin = () => {
    navigate("/login")
  }


  const adminBtn = () => {
    if (logged.state) {
        try {
          navigate("/admin")
        } catch (error) {
            console.log(error.message)
        }
    }
  } 


  // funciones del admin
  const sessionBtn = () => {
    if (logged.state) {
      Swal.fire({
        title: 'Terminará tu sesión actual',
        text: '¿Está seguro que desea terminar su sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLogoutLoading(true)
            const getLogout = async () => {
              const response = await axios.post(host + ":3001/post/logout")

              const result = response.data
              console.log(result)
              // Cambia el estado de 'logged' de la accion del reducer toogleLogin
              dispatch(toggleLogin(false))

              // Limpia el localStorage
              localStorage.clear()
              navigate("/login")

              if (logged.state) {
                getLogout();
              }
              toggleLogin(false)
            }
            getLogout();


          } catch (error) {
            console.log(error.message)
          } finally {
            setLogoutLoading(false)
          }
        }
      });

    } else {
      goToLogin();
    }
  }


  return (
    <>
      <header className="text-white items-center min-w-[500px]" id="top-header">
        
        {/* Contenedor principal con espacio adecuado */}
        <div className="bg-orange-uam grid grid-cols-2 py-[30px] px-[60px] lg:px-10 items-center">
          
          {/* Título del departamento */}
          <div className="flex justify-center col-span-1">
            <NavLink to="/" className="text-white no-underline">
              <h1 className="text-xl">Departamento de Matemáticas Aplicadas y Sistemas</h1>
            </NavLink>
          </div>
  
          {/* Botón de sesión */}
          <div className="flex justify-center items-center col-span-1 space-x-4 hover:text-gray-400 transition-all duration-500">
            <button 
              className="flex items-center gap-2"
              onClick={sessionBtn}
            >
              <span>{logged.state ? "Cerrar sesión" : "Iniciar sesión"}</span>
              {logoutLoading ? <ShortLoading /> : <FontAwesomeIcon icon={faCircleUser} className="h-6 w-6"/>}
            </button>
  
            {/* Botón de administrador */}
            {logged.state && (
              <button className="flex items-center gap-2" onClick={adminBtn}>
                <span>Administrador</span>
                <FontAwesomeIcon icon={faUserTie} className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
  
        {/* Menú Hamburguesa (visible solo en pantallas pequeñas) */}
        <div className="lg:hidden flex justify-end p-[18px]">
          <button onClick={() => setMenuHamburguerOpen(!menuHamburguerOpen)} className="text-orange-uam">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>
  
        {/* Menú de navegación */}
        <nav className={`lg:flex justify-center large:py-6 ${menuHamburguerOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-gray-700 text-center ">
            {sections.slice(0, -1).map((e, index) => (
              
              index !== 1 ? (
                <NavLink
                  key={`section-${index}`}
                  to={`/${e.to}`}
                  onClick={() => setActiveIndex(index)}
                  className={`min-w-[150px] w-full hover:text-orange-500 relative after:absolute after:w-full after:h-1 after:bg-orange-500 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${activeIndex === index ? 'underline underline-offset-[3px] decoration-[3px] decoration-orange-uam' : ''}`}
                >            
                  {e.title}
                </NavLink>
              ) : (
                <div 
                  key={`section-${index}`} 
                  className={`flex justify-center min-w-[150px] relative dropdown nav-link ${isOpen ? "open" : ""}`}
                  ref={dropdownRef}
                >
                  <button className="flex items-center gap-2 hover:text-orange-500 transition-all" onClick={() => setIsOpen(!isOpen)}>
                    <span>Categorias</span>
                    <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                  </button>
                  <div className={`absolute top-12 w-48 z-10 bg-white shadow-lg rounded-md ${!isOpen && "hidden"}`}>
                    {categorias.map((cat, i) => (
                      <NavLink
                        key={`${i}-category`}
                        to={`/${cat.link}`}
                        className="block px-4 py-2 text-gray-700 bg-orange-300 hover:bg-orange-uam"
                        onClick={handleClickCategories}
                      >
                        {cat.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </nav>
      </header>
    </>
  );
  
  


};

export default Header