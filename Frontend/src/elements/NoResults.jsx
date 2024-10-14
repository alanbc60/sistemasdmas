import vacio from '../assets/icons/empty.png'
// import '../styles/elements/NoResults.css'
export default function NoResults() {
  return (
    <article className="no-results">
        <figure className='no-results-fig'>
            <img src={vacio} alt='caja vacia' className='no-results-img'/>
        </figure>
        <h4 className='no-results-title'>¡Vaya! Esto está vacío, aún no hay nada que mostrar.</h4>
    </article>
  )
}
