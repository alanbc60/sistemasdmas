/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import NoResults from '../../elements/NoResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen , faTrash} from '@fortawesome/free-solid-svg-icons';
// import '../styles/components/Categorias.css'
import Clamp from 'react-multiline-clamp';
import { Container, Row } from 'react-bootstrap';

/**
 * 
 * @param {array, string, any, func} 
 * arrGrid: Arreglo de objetos que contienen fecha, titulo, responsable e id
 * pathItem: String que sirve para identificar la categoría en la que se encuentra y con ello redireccionar a la respectiva compoenente editar____
 * isLoggedIn: debería ser booleana pero en ocasiones es nula, dice si el estado global esta logeado o no
 * deleteItem: función para hacer la petición al servidor de eliminar un elemento  
 * @returns Regresa un contenedor que renderiza items
 */


export const GridContainer = ({ arrGrid, pathItem, isLoggedIn, deleteItem }) => {
  return (
    <>
      {arrGrid && (
        <>
          {arrGrid.length > 0 ? (
            <div className="my-8 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {arrGrid.map((e, index) => (
                  <GridItem
                    key={index}
                    item={e}
                    pathItem={pathItem}
                    isLoggedIn={isLoggedIn}
                    deleteItem={deleteItem}
                  />
                ))}
              </div>
            </div>
          ) : (
            <NoResults />
          )}
        </>
      )}
    </>
  );
};



GridContainer.propTypes = {
  arrGrid:PropTypes.array,
  pathItem: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.any.isRequired,
  deleteItem: PropTypes.func.isRequired
}


export const GridItem = ({ item, pathItem, isLoggedIn, deleteItem }) => {
  const navigate = useNavigate();
  const handleDelete = (e) => {
    deleteItem(e);
  };

  const procesarFecha = (fecha) => {
    if (fecha) {
      const formatoAnio = /^\d{4}$/;
      if (formatoAnio.test(fecha)) {
        return fecha;
      } else {
        const dateObject = new Date(fecha);
        return `${dateObject.getUTCDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      }
    }
    return null;
  };

  const date = procesarFecha(item.fecha);

  return (
    <article className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 max-w-md">
      <figure className="h-40 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={item.imagen}
          alt={item.titulo}
        />
      </figure>
      <div className="p-4">
        <h5 className="text-lg font-bold mb-1">{item.titulo}</h5>
        {item.responsable && (
          <p className="text-gray-600 mb-2">{item.responsable}</p>
        )}
        {date && <p className="text-sm text-gray-500 mb-4">{date}</p>}
        <div className="flex items-center justify-between">
          <button
            className="w-72 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 ease-in-out"
            onClick={() => navigate(`/ver${pathItem}${item.id}`)}
          >
            Ver más
          </button>
          {isLoggedIn && (
            <div className="flex space-x-3">
              <button
                className="bg-white shadow-md p-3 rounded-xl hover:bg-gray-100"
                onClick={() => navigate(`/editar${pathItem}${item.id}`)}
              >
                <FontAwesomeIcon icon={faPen} className="text-yellow-500" />
              </button>
              <button
                className="bg-white shadow-md p-3 rounded-xl hover:bg-gray-100"
                onClick={() => handleDelete(item)}
              >
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};




GridItem.propTypes = {
  item: PropTypes.object.isRequired,
  pathItem: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.any.isRequired,
  deleteItem: PropTypes.func.isRequired
}