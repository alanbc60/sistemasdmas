import React from 'react';
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

    const celdaStyle = 'text-center p-3';
    const btnCelda= 'grid grid-cols-1 place-items-center py-2 min-w-[85px] min-h-[40px] font-bold text-xs rounded-lg border-none shadow-lg hover:shadow-md transition-colors duration-500'

    return (
        <tr className="hover:bg-gray-100 transition-colors duration-300">
            <td className={`${celdaStyle}`}>
                <p>{idusuario}</p>
            </td>

            <td className={`${celdaStyle}`}>
                <p className="text-gray-600"> {nombre} </p>
            </td>

            <td  className={`${celdaStyle}`}>
                <p className="text-gray-600"> {apaterno} </p>
            </td>

            <td  className={`${celdaStyle}`}>
                <p className="text-gray-600 font-bold">{amaterno} </p>
            </td>

            <td  className={`${celdaStyle}`}>
                <p className="text-gray-600"> {mail} </p>
            </td>

            <td  className={`${celdaStyle}`}>
                <p className="text-gray-600">{password} </p>
            </td>

            <td className={`${celdaStyle} flex justify-center gap-6`}>

                <button
                    type="button"
                    className={`text-yellow-500 ${btnCelda} hover:bg-yellow-200`}
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
                    className={`text-red-600 ${btnCelda}  hover:bg-red-200 `}
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