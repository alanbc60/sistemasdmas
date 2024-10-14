import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import NoResults from './NoResults';
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
export const GridConteiner = ({
  arrGrid, pathItem, 
  isLoggedIn, deleteItem })=>{
  return(
    <>
    {arrGrid&&
    <>{arrGrid.length>0?
      <div className='justify-content-center my-4'>
        <Container>
          <Row className='justify-content-center row-cols-auto gap-4'>
          {arrGrid.map((e,index)=>(
          <GridItem key={index} item={e} pathItem={pathItem} isLoggedIn={isLoggedIn} deleteItem={deleteItem}/>
        ))}
          </Row>
        </Container>
      </div>
      :
      <NoResults/>}
    </>
    }
    </>
  )
}

GridConteiner.propTypes = {
  arrGrid:PropTypes.array,
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
export const GridItem = ({item,  pathItem, isLoggedIn, deleteItem})=>{
  
  const procesarFecha = (fecha)=>{
    if (fecha){
      const formatoAnio = /^\d{4}$/;
      if (formatoAnio.test(fecha)) {
        return fecha
      }else{
        const dateObject = new Date(fecha);
        return ''+dateObject.getUTCDate()+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear();
      }
    }else{
      return null
    }
  }  
  const date = procesarFecha(item.fecha);
  const navigate = useNavigate();
  const handleDelete = (e)=>{
    deleteItem(e)
  }
  return(
      <article className='item-container'>
        <figure className='item-fig'>
          <img className='item-img' src={item.imagen} alt={item.titulo}/>
        </figure>
        <div>
        <Clamp lines={3}>
          <h5 className='item-title'>{item.titulo}</h5>
        </Clamp>
        </div>
        {item.responsable&&
          <div>
            <Clamp lines={3}>
            <p className='item-exp'>{item.responsable}</p>
            </Clamp>
          </div>
        }
        {date&&
          <p className='item-date'>{date}</p>
        }
        <div className='item-container-btn'>
          <button className='item-btn-ver' onClick={()=>navigate(`/ver${pathItem}${item.id}`)}>
            Ver más
          </button>
          {isLoggedIn&&
            <div className='item-container-btn-sesion'>
              <button className='edit-btn'   onClick={()=>navigate(`/editar${pathItem}${item.id}`)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className='delete-btn' onClick={()=>handleDelete(item)}>
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