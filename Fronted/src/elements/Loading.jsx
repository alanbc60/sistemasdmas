import '../styles/elements/Loading.css'
//import {ReactComponent as Spinner} from '../assets/others/spinner.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export function Loading() {
  return (
    <div id='loading-logo'>
    <h6>Espera mientras terminamos...</h6>
    <div id='loadingContainer'>
      <div className='tri'></div>
      <div className='square1'></div>
      <div className='square2'></div>
      <div className='square3'></div>
    </div>
    </div>
  )
}

export function ShortLoading(){
  return(
    <div className='spinnerContainer'>
      <FontAwesomeIcon icon={faSpinner}/>
    </div>
  )
}
