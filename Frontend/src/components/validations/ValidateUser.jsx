// src/services/authService.js
import axios from 'axios';
import Swal from 'sweetalert2';

export const validateUser = async () => {
  try {
    const response = await axios.get('http://localhost:3001/get/login', { withCredentials: true });
    return response.data.loggedIn; // Retorna el estado de autenticación
  } catch (error) {
    Swal.fire({
      icon: 'error',
      iconColor: '#F05757',
      backdrop: 'rgba(255,157,5,0.2)',
      title: 'Oops...',
      text: 'Parece que hubo un problema.',
      showConfirmButton: false,
      timer: '4000',
      footer: error.message === 'Network Error' ? 'Intente más tarde' :
        error.message === 'Request failed with status code 500' ? 'Error interno del servidor (500)' : error.message,
    });
    return false; // Retorna false en caso de error
  }
};
