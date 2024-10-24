/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NoResults from '../../elements/NoResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import '../styles/components/Categorias.css'
// import Clamp from 'react-multiline-clamp';
// import { Container, Row } from 'react-bootstrap';

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
      {arrGrid &&
        <>{arrGrid.length > 0 ?
          <div className='flex justify-center'>
            <div className='flex justify-center flex-wrap w-full gap-4 m-6'>
              {arrGrid.map((e, index) => (
                <GridItem key={index} item={e} pathItem={pathItem} isLoggedIn={isLoggedIn} deleteItem={deleteItem} />
              ))}
            </div>
          </div>

          :
          <NoResults />}
        </>
      }
    </>
  )
}

GridContainer.propTypes = {
  arrGrid: PropTypes.array,
  pathItem: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.any.isRequired,
  deleteItem: PropTypes.func.isRequired
}
/**
 * 
 * @param {object, string, any, func} 
 * item: contienen fecha, titulo, responsable e id
 * pathItem: String que redirecciona a la componente editar___ según la categoría
 * isLoggedIn: debería ser booleana pero en ocasiones es nula, dice si el estado global esta logeado o no
 * deleteItem: función para hacer la petición al servidor de eliminar un elemento  
 * @returns un elemento del Grid 
 */
export const GridItem = ({ item, pathItem, isLoggedIn, deleteItem }) => {

  const procesarFecha = (fecha) => {
    if (fecha) {
      const formatoAnio = /^\d{4}$/;
      if (formatoAnio.test(fecha)) {
        return fecha
      } else {
        const dateObject = new Date(fecha);
        return '' + dateObject.getUTCDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
      }
    } else {
      return null
    }
  }
  const date = procesarFecha(item.fecha);
  const navigate = useNavigate();
  const handleDelete = (e) => {
    deleteItem(e)
  }
  const btnCelda= 'py-2 min-w-[85px] min-h-[40px] font-bold rounded-lg border shadow-lg hover:shadow-md transition-colors duration-500'
  return (
    <article id='item-container' className='grid p-[24px] border shadow-md rounded-2xl w-[300px] min-h-[400px] '>
      <figure id='item-fig' className='max-h-[116px] w-full overflow-hidden'>
        <img id='item-img' className='translate-x-1/5 -translate-y-1/4' src={item.imagen} alt={item.titulo} />
      </figure>
      
      <div>
        <div className=''>
          <h5 id='item-title' className=''>{item.titulo}</h5>
        </div>
      </div>
      {item.responsable &&
        <div>
          <div >
            <p id='item-exp' className='text-gray-500' >{item.responsable}</p>
          </div>
        </div>
      }
      {date &&
        <p id='item-date' className='text-gray-500'>{date}</p>
      }
      <div id='item-container-btn' className='grid'>
        <button id='item-btn-ver' className='w-full h-[45px] border border-gray-500 rounded-lg 
              hover:text-white hover:shadow-lg hover:bg-orange-300 transition-colors 
                duration-500' 
                onClick={() => navigate(`/ver${pathItem}${item.id}`)}
          >Ver más
        </button>
        {isLoggedIn &&
          <div id='item-container-btn-sesion' className='grid grid-cols-2'>
            <button id='edit-btn' 
            className={`text-yellow-500 ${btnCelda} hover:bg-yellow-200`}
            onClick={() => navigate(`/editar${pathItem}${item.id}`)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button id='delete-btn' 
            className={`text-red-500 ${btnCelda} hover:bg-red-200`}
            onClick={() => handleDelete(item)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        }
      </div>
    </article>
  )
}

GridItem.propTypes = {
  item: PropTypes.object.isRequired,
  pathItem: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.any.isRequired,
  deleteItem: PropTypes.func.isRequired
}