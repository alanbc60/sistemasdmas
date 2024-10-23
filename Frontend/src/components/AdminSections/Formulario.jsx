import React from 'react';
import { useState, useEffect } from 'react';

const Formulario = ({ usuario }) => {
  // Define un estado local para el usuario actual
  const [usuarioActual, setUsuarioActual] = useState(usuario);
  // Actualiza el estado local cuando cambia la prop usuario
  useEffect(() => {
      setUsuarioActual(usuario);
  }, [usuario]);
  console.log("usuarioActual: " + JSON.stringify(usuarioActual));


  const inputStyle = 'bg-gray-50 mt-2 block p-3 w-full border border-[1px] border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-500';
  return (
      <>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="nombre">
            Nombre:
          </label>
          <input
            id="nombre"
            type="text"
            className={`${inputStyle}`}
            placeholder="Ingresa el nombre"
            name="nombre"
            defaultValue={usuarioActual?.nombre || ''}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="apaterno">
            Apellido paterno:
          </label>
          <input
            id="apellido_paterno_input"
            type="text"
            className={`${inputStyle}`}
            placeholder="Ingresa el apellido paterno"
            name="apaterno"
            defaultValue={usuarioActual?.apaterno || ''}
          />
        </div>
  
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="amaterno">
            Apellido materno:
          </label>
          <input
            id="apellido_materno_input"
            type="text"
            className={`${inputStyle}`}
            placeholder="Ingresa el apellido materno"
            name="amaterno"
            defaultValue={usuarioActual?.amaterno || ''}
          />
        </div>
  
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="email">
            Correo:
          </label>
          <input
            id="email_input"
            type="email"
            className={`${inputStyle}`}
            placeholder="Ingresa el correo"
            name="mail"
            defaultValue={usuarioActual?.mail || ''}
          />
        </div>
  
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="password">
            Password:
          </label>
          <input
            id="password_input"
            type="text"
            className={`${inputStyle}`}
            placeholder="Ingresa el password"
            name="password"
            autoComplete="off"
            defaultValue={usuarioActual?.password || ''}
          />
        </div>
      </>
    );
  };
  
  export default Formulario;
  
