import { useNavigate} from 'react-router-dom';
//import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faUserPen , faTrash } from '@fortawesome/free-solid-svg-icons';
import { eliminarUsuario } from '../../hooks/useAdmin';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



function Usuario({usuario}) {
    const navigate = useNavigate();
    const {idusuario, nombre, apaterno, amaterno, mail, password } = usuario
    //const [usuarioEditando, setUsuarioEditando] = useState(null);

    const handleEliminarUsuario =  async(idUsuario) => {
        if(idUsuario == 1){
            await mostrarMensajeDeError("Error al eliminar el Administrador");
        }else{
            
            Swal.fire({
                title: 'Eliminar Usuario',
                text: '¿Deseas eliminar este registro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await eliminarUsuario(idUsuario);
                    toast.success('Usuario eliminado exitosamente', {
                        autoClose: 4000
                    });
                    toast.info('Recargando Usuarios');
                    setTimeout(() => {
                        navigate(0); // Regresa a la página anterior después de actualizar
                    }, 4000); 
                }
            });
        }
    };

    async function mostrarMensajeDeError(mensaje, tiempoVisible = 3000) {
        const toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: tiempoVisible,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      
        return toast.fire({
          title: mensaje,
          icon: 'error',
          customClass: {
            popup: 'rounded'
          }
        });
    }


    return (
        <tr className="border-b">
            <td className='p-6 space-y-2'>
                <p>{idusuario}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600"> {nombre} </p>
            </td>

            <td>
                <p className="text-gray-600"> {apaterno} </p>
            </td>

            <td>
                <p className="text-gray-600 font-bold">{amaterno} </p>
            </td>

            <td>
                <p className="text-gray-600"> {mail} </p>
            </td>

            <td>
                <p className="text-gray-600">{password} </p>
            </td>

            <td className="p-6 flex gap-3 justify-end">
                <button
                    type="button"
                    className="text-yellow-500 hover:bg-yellow-200 uppercase font-bold text-xs border-none shadow-md transition duration-600 hover:shadow-lg"
                    onClick={() => navigate(`./usuarios/editarUsuario/${idusuario}`) }
                >
                    <FontAwesomeIcon icon={faUserPen} />
                     Editar
                </button>
                 
            <form
                method='delete'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleEliminarUsuario(idusuario);
                }}
            >
                <button
                    type="submit"
                    className="text-red-600 hover:bg-red-300 uppercase font-bold text-xs border-none shadow-md transition duration-600 hover:shadow-lg"
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Eliminar
                </button>
            </form>
  
            </td>
        </tr>
    )
}

export default Usuario