// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import toggleLogin from '../../redux/actions/toggleLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../data/host';
import { useSelector } from 'react-redux';
/**
 * 
 * @param {object} props
 * logged.state :estado global
 * toggleLogin: funcion para cambiar el estado global 
 * @returns componente auxiliar para proteger rutas, al ser montado revisa que se este logeado haciendo
 * una petición al back y actualizando el estado global, si el estado global es falso se redirecciona al
 * login, de otra forma se carga las rutas hijo
 */

function ProtectedRoute({ toggleLogin }) {
  const loggedState = useSelector((state) => state.logged);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    const getLogin = async () => {
      try {
        const response = await axios.get(`${host}:3001/get/login`, { withCredentials: true });
        toggleLogin(response.data.loggedIn);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false); // Indicar que la carga ha terminado
      }
    };

    getLogin();
  }, [toggleLogin]);

  if (isLoading) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras espera la validación
  }

  if (!loggedState) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}


const mapStateToProps = (state) =>{
    return{
        logged: state.logged,
    };
  };
  
  const mapDispatchToProps ={
    toggleLogin,
  };
  
const ConnectedEditarProtectedRoute =  connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
export default ConnectedEditarProtectedRoute;