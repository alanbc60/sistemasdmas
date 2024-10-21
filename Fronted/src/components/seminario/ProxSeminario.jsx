import Clamp from 'react-multiline-clamp';
import NoResults from '../../elements/NoResults';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import { ButtonLink } from '../../elements/Buttons';
import { ShortLoading } from '../../elements/Loading';
import { Container } from 'react-bootstrap';
/**
 * 
 * @param {object, bool} 
 * proxSeminario: Objeto con los datos fecha, id, imagen, titulo, resumen, youtube 
 * bool: estado para mostrar el objeto una vez se tenga
 * @returns componente en forma de tarjeta que muestra el contenido del objeto
 */
export const ProximoSeminario = ({proxSeminario, loadingProxSeminario})=>{
    const dateObject = new Date(proxSeminario.fecha);
    const date = ''+dateObject.getDate()+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear();
    const navigate = useNavigate();
    const handleClick = ()=>{
      navigate(`/ver/seminarios/${proxSeminario.id}`)
    }
  
    return(
      <>
      {loadingProxSeminario ? <ShortLoading/>:
      <Container>
        <Container className='mt-3'>
          <h3 className='text-center'>Próximo seminario</h3>
        </Container>
        {proxSeminario.length===0?<NoResults/>:
        <article id='prox-seminario-article'>
          <figure id='prox-seminario-fig' onClick={handleClick}>
            <img alt='descripción del seminario' src={proxSeminario.imagen} id='prox-seminario-img'/>
          </figure>
          <aside id='prox-seminario-info'>
            <div>
            <Clamp lines={3}>
              <h4 id='prox-seminario-title'>{proxSeminario.titulo}</h4>
            </Clamp>
            </div>
            <p>{proxSeminario.responsable}</p>
            <div>
            <Clamp lines={3}>
              <p className='prox-seminario'>{proxSeminario.resumen}</p>
            </Clamp>
            </div>
            <ButtonLink label={'en Youtube'} path={proxSeminario.youtube}/>
            <p className='text-muted'>{date}</p>
          </aside>
        </article>
        }
        <Container className='my-4'>
          <h3 className='text-center'>Más seminarios</h3>
        </Container>
      </Container>}
      </>
    )  
  }
  
ProximoSeminario.propTypes = {
proxSeminario: PropTypes.any.isRequired,
loadingProxSeminario: PropTypes.bool.isRequired
}
  