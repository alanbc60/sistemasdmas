// import { eliminarUsuarioServidor } from '../api'; // Debes crear este archivo con la función correspondiente

// const eliminarUsuario = (idUsuario) => {
//   return async (dispatch) => {
//     try {
//       // Llama a la función para eliminar el usuario en el servidor
//       await eliminarUsuarioServidor(idUsuario);

//       // Si se elimina con éxito en el servidor, despacha la acción localmente
//       dispatch({ type: 'ELIMINAR_USUARIO', payload: { idUsuario } });
//     } catch (error) {
//       // Manejar errores, podrías despachar otra acción para manejar el error
//     }
//   };
// };

// export { eliminarUsuario };