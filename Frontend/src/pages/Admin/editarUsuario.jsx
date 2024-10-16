import { useNavigate } from 'react-router-dom';
import Formulario from '../../../components/Admin/Formulario';
import Error from '../../../components/Admin/Error'
import validator from 'validator';
import { useState, useEffect } from 'react';
import { actualizarUsuario, obtenerUsuario } from '../../../hooks/useAdmin';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';


const validarDatos = (datos) => {
  const email = datos.mail;
  const errores = [];
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }

  if (!validator.isEmail(email)) {
    errores.push('El Email no es válido');
  }

  return { errores };
};

function EditarUsuario() {
  const [errores, setErrores] = useState(null);
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  const { usuarioId } = useParams();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (!usuarioId) {
          console.error('El usuarioId no está definido.');
          return;
        }
        const usuarioData = await obtenerUsuario({ params: { usuarioId } });
        console.log('Usuario:', usuarioData.datos);
        setUsuario(usuarioData.datos[0]); // Asigna directamente el objeto de usuario
      } 
      catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  const showConfirmation = () => {
    Swal.fire({
      title: '¿Seguro quieres cancelar?',
      text:'No se guardara ningun cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1); 
      }
    });
  };


  const handleActualizarUsuario = async (datos) => {
    try {
      const resultadoValidacion = validarDatos(datos);
      if (resultadoValidacion.errores.length > 0) {
        console.log('Errores:', resultadoValidacion.errores);
        setErrores(resultadoValidacion.errores);
      } 
      else {
        setErrores(null);

        const usuarioActualizado = await actualizarUsuario({ params: { usuarioId }, datos })

        if( usuarioActualizado == true){
          toast.success('Usuario actualizado exitosamente',{
            autoClose: 5000 // Duración de 5 segundos
          }); 
          navigate(-1); // Regresa a la página anterior después de actualizar   
        }
        else if(usuarioActualizado == null)
          setErrores(['Correo en uso por otro usuario'])

        else
          setErrores(['Error al actualizar usuario'])
      }
      
    } 
    
    catch (error) {
      console.error('Error de validación:', error);
      setErrores(error.errores || ['Error de validación desconocido']);
    }
    
  };

  return (
    <>
    <div className='text-center'>
      <h1 className="font-black text-4xl text-orange-500">Datos del Usuario</h1>
      <p className="mt-3">Verifique que todos los campos sean correctos</p>

    </div>
      <div className="flex justify-end">
        <button className="bg-orange-uam text-white px-3 py-1 font-bold uppercase border-none shadow-md transition duration-600 hover:bg-orange-300 hover:shadow-lg"
        onClick={showConfirmation}>
        {/* onClick={() => navigate(-1)}> */}
          Descartar
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <form
          method="post"
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const datos = Object.fromEntries(formData);

            try {
              handleActualizarUsuario(datos);
            } catch (error) {
              console.error('Error de validación:', error);
              setErrores(error);
            }
          }}
        >
          <Formulario usuario={usuario} />

          <input
            type="submit"
            className='mt-2 w-full bg-orange-uam p-3 uppercase font-bold text-white text-lg border-none rounded-md shadow-md transition duration-600 hover:bg-orange-300 hover:shadow-lg'
            value="Confirmar Cambios"
          />
        </form>
      </div>
    </>
  );
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


const ConnectedEditarUsuario = connect(mapStateToProps, mapDispatchToProps)(EditarUsuario);
export default ConnectedEditarUsuario;


