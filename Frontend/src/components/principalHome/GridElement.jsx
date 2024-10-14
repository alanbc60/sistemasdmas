import React from 'react'
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

/**
 * 
 * @param {object} item
 * item: objeto con nombre, link e icono 
 * @returns link interno en forma de boton para navegar a alguna categoría
 */

export default function GridElement({item}) {
  return (
      // Retorna un link interno para navegar a alguna categoría (link lo obtiene de sections.js)
      // Estás construyendo la URL con /${item.link}, y esta será la parte de la URL que useParams en usePageLayout está tratando de obtener y comparar

      <NavLink id="inicio-grid-link" className='min-w-[350px] max-w-full w-full min-h-[180px] max-h-full h-full p-5 m-3' to={`/${item.link}`}>
          <article id="inicio-grid-container" className='grid grid-cols-[1fr_1.1fr] break-words items-center justify-center w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-3'>
            <figure id="inicio-grid-figure" className='min-w-[50px] max-w-[100px] min-h-[50px] max-h-[100px] m-0'>
              <img id="inicio-grid-img" className='w-full min-w-[100px] max-w-[100px] overflow-hidden' src={item.icon} alt={`icon of ${item.title}`}/>
            </figure>
            <Container className='pe-4'>
            <p id="inicio-grid-item" className='text-black break-words m-0 w-full text-left font-medium text-xl leading-relaxed'>{item.title}</p>
            </Container>
          </article>
      </NavLink>
  )
}

GridElement.propTypes = {
    item: PropTypes.object.isRequired
};