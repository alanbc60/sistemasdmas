
// const initialState = {
//     usuarios: [],
//     loading: false,
//     error: null,
//     selectedUser: null,
//   };
  
//   function reducer(state = initialState, action) {
//     switch (action.type) {
//       case 'ELIMINAR_USUARIO':
//         const { idUsuario } = action.payload;
//         // Crear una nueva copia del arreglo de usuarios excluyendo el usuario con el ID dado
//         const nuevosUsuarios = state.usuarios.filter(usuario => usuario.id !== idUsuario);
  
//         // Devolver un nuevo estado con el arreglo de usuarios actualizado
//         return {
//           ...state,
//           usuarios: nuevosUsuarios,
//         };
//       default:
//         return state;
//     }
//   }
  
//   export default reducer;
