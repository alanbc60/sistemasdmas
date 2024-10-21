// useAdmin.js
import validator from 'validator';
import { host } from '../data/host';


export const AdminLoader = async () => {
  try {
    const response = await fetch(host + `:3001/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      data.forEach(item => {
        console.log("Objeto:", item);
      });
      return data;
    } else {
      console.error('Error al cargar datos');
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const agregarUsuario = async (datos) => {
  console.log("Se agregará el usuario: " + JSON.stringify(datos));

  try {
    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await consultarUsuario(datos.mail);

    console.log("Usuario existente:", usuarioExistente);

    if (usuarioExistente.encontrado) {
      console.log("El usuario ya existe en la base de datos.");
      return null;
    } else {
      const response = await fetch(host + `:3001/registrarUsuario`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return true;
      } else {
        console.log("Error al registrar usuario:", response.statusText);
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error al agregar usuario');
  }
};



export const consultarUsuario = async (correo) => {
  console.log("Se consultará el usuario: " + correo);

  try {
    const response = await fetch(host + `:3001/obtenerUsuario/${correo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();

      if (data.status === 'no_encontrado') {
        return { encontrado: false, mensaje: data.message };
      }
      else if (data.status === 'encontrado') {
        return { encontrado: true, datos: data.datos };
      }
      else {
        return { encontrado: false, mensaje: 'Error desconocido' };
      }
    }
    else {
      return { encontrado: false, mensaje: 'Error en la solicitud' };
    }
  } catch (error) {
    console.log(error);
    return { encontrado: false, mensaje: 'Error en la solicitud' };
  }
};



export async function obtenerUsuario({ params }) {
  console.log("usuario loader params: " + params.usuarioId);
  console.log("Tipo: "+typeof(params.usuarioId));

  const ID_Usuario = parseInt(params.usuarioId);

  const url = host + `:3001/obtenerUsuarioEspecifico/${ID_Usuario}`;
  console.log("url: " + url);


  const respuesta = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resultado = await respuesta.json();

  if (resultado.status == "encontrado") {
    return { encontrado: true, datos: resultado.datos };
  } else if(resultado.status == "no_encontrado"){
    console.log("Error: " + resultado.message);
    return { encontrado: false, mensaje: resultado.message };
  }
}


export async function actualizarUsuario(data) {
  const datos = data.datos;
  const id = data.params.usuarioId;

  try {

      // verifica que el usuario exista
      // const usuarioExistente = await verificarCorreoExistente(datos.mail, id);

      // if(usuarioExistente.encontrado){
      //   return null;
      // }


      const response = await fetch(host + `:3001/verificarCorreoExistente/${datos.mail}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const resultado = await response.json();


      if(resultado.status == "correo_no_vinculado"){
        const response = await fetch(host + `:3001/actualizarUsuario/${id}`, {
          method: 'PUT',
          body: JSON.stringify(datos),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const resultado = await response.json()

        if(response.ok){
          console.log("mensaje: "+resultado.message);
          return true; 
        }
        else{
          return false;
        }

      }
      // correo en uso
      else{
        return null;
      }
      
  } 
  catch (error) {
    console.log(error)
  }
}



export const eliminarUsuario = async(id) => {
  console.log("Se eliminara el usuario: " + id);
  typeof(id);
  try {
      const response = await fetch( host + `:3001/eliminarUsuario/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    
}



export const validarDatos = async ({ request }) => {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get('mail');

  // Valida que el correo sea válido
  const errores = [];
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }

  if (!validator.isEmail(email)) {
    errores.push('El Email no es válido');
  }

  // Retorna datos si hay errores
  if (errores.length > 0) {
    return errores;
  }

  await agregarUsuario(datos);
  // Puedes retornar datos adicionales o redirigir a otra ruta si es necesario
  return { success: true };
};
