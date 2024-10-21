import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

/**
 * 
 * @param {object} item
 * item: objeto con nombre, link e icono 
 * @returns link interno en forma de boton para navegar a alguna categoría
 */
export default function InicioGridItem({item}){
    return (
      // Retorna un link interno para navegar a alguna categoría (link lo obtiene de sections.js)
      // Estás construyendo la URL con /${item.link}, y esta será la parte de la URL que useParams en usePageLayout está tratando de obtener y comparar

      <NavLink className='inicio-grid-link' to={`/${item.link}`}>
          <article className='inicio-grid-container'>
            <figure className='inicio-grid-figure'>
              <img className='inicio-grid-img' src={item.icon} alt={`icon of ${item.title}`}/>
            </figure>
            <Container className='pe-4'>
            <p className='inicio-grid-title'>{item.title}</p>
            </Container>
          </article>
      </NavLink>
    )
  }
  
InicioGridItem.propTypes = {
    item: PropTypes.object.isRequired
};