// src/components/GlobalAuth.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  setAuthenticated  from '../../redux/actions/toggleLogin';
import  {validateUser}  from './ValidateUser';

const GlobalAuth = ({ children }) => {
  const dispatch = useDispatch();

  // Validar al iniciar la app y periódicamente cada 10 minutos
  useEffect(() => {
    const validate = async () => {
      const isLoggedIn = await validateUser(); // Llama a tu función de validación asíncrona
      dispatch(setAuthenticated(isLoggedIn)); // Actualiza el estado
    };

    validate(); // Validación inicial

    const interval = setInterval(validate, 10 * 60 * 1000); // Cada 10 minutos
    return () => clearInterval(interval); // Limpiar al desmontar
  }, [dispatch]);

  return children; // Renderiza el contenido de la aplicación
};

export default GlobalAuth;