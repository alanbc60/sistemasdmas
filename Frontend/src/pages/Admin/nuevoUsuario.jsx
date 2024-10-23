import React from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../../components/adminSections/Formulario';
import Error from '../../components/adminSections/Error'
import { agregarUsuario } from '../../hooks/useAdmin';
import validator from 'validator';
import { useState } from 'react';
import toggleLogin from '../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';



const validarDatos = (datos) => {
  const email = datos.mail;

  // Valida que el correo sea válido
  const errores = [];
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }

  if (!validator.isEmail(email)) {
    errores.push('El Email no es válido');
  }

  // Retorna un objeto con la propiedad 'errores'
  return { errores };
};


function NuevoUsuario() {
  const [errores, setErrores] = useState(null);
  const navigate = useNavigate()

  const handleAgregarUsuario = async (datos) => {
    console.log('Datos:', datos);
    try {
      const resultadoValidacion = validarDatos(datos);
      if (resultadoValidacion.errores.length > 0) {
        console.log('Errores:', resultadoValidacion.errores);
        // Si hay errores, establecer el estado local de errores
        setErrores(resultadoValidacion.errores);
      } 
      else {
        console.log('No hay errores');
        // Limpiar el estado de errores
        setErrores(null);
        // Si no hay errores, proceder con la lógica de agregar usuario
        const usuarioAgregado = await agregarUsuario(datos);

        if(usuarioAgregado == true){
          toast.success('Usuario creado exitosamente',{
            autoClose: 5000 // Duración de 5 segundos
          }); 
          navigate(-1); // Regresa a la página anterior después de actualizar          
        }

        else if(usuarioAgregado == null)
          setErrores(['Correo en uso por otro usuario'])

        else
          setErrores(['El usuario ya existe']);
      }
    } catch (error) {
      // Manejar los errores de validación aquí
      console.error('Error de validación:', error);
      // Puedes establecer el estado de errores si es necesario
      setErrores(error.errores || ['Error de validación desconocido']);
    }
  };


  return (
    <>
      <div className="text-center">
        <h1 className="font-black text-4xl text-orange-500">Nuevo Usuario</h1>
        <p className="mt-3">Llena todos los campos para registrar un nuevo usuario</p>
      </div>


      <div className="flex justify-end">
        <button
          className="bg-orange-uam text-white px-3 py-1 font-bold uppercase border-none rounded-lg shadow-md transition duration-500 hover:bg-orange-300 hover:shadow-lg"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>


      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <form
          method='post'
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const datos = Object.fromEntries(formData);

            try {
              handleAgregarUsuario(datos);
            } 
            catch (error) {
              // Manejar los errores de validación aquí
              console.error('Error de validación:', error);
              // Puedes establecer el estado de errores si es necesario
              setErrores(error);
            }
          }}
        >
          <Formulario />
          <input
            type="submit"
            className='mt-2 w-full bg-orange-uam p-3 uppercase font-bold text-white text-lg border-none rounded-md shadow-md transition duration-600 hover:bg-orange-300 hover:shadow-lg'
            value="Registrar Usuario"
          />
        </form>

      </div>
    </>
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


const ConnectedNuevoUsuario = connect(mapStateToProps, mapDispatchToProps)(NuevoUsuario);
export default ConnectedNuevoUsuario;
