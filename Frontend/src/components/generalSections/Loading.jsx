// import '../styles/elements/Loading.css'
//import {ReactComponent as Spinner} from '../assets/others/spinner.svg';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export function Loading() {
  return (
    
    <div className="flex flex-col items-center justify-center my-10" id="loading-logo">
      <h6>Espera mientras terminamos...</h6>
      <div className="relative origin-[14em_14em] animate-[rotate_5s_-1s_infinite] w-[30em] h-[25em] mx-auto scale-50" id="loadingContainer">
        <div className="absolute border-0 border-t-[3em] border-r-[4em] border-b-[3em] border-l-[4em] border-transparent border-r-[#DFA67B] border-b-[#DFA67B] transform translate-x-[10em] translate-y-[10em]" />
        <div className="absolute top-0 w-[8em] h-[8em] bg-[#FFF2CC] transform translate-x-[10em] translate-y-[16em] rotate-180 animate-[fill1_5s_infinite]" />
        <div className="absolute w-[6em] h-[6em] bg-[#FFD966] transform translate-x-[18em] translate-y-[10em] rotate-90 animate-[fill2_5s_infinite]" />
        <div className="absolute w-[10em] h-[10em] bg-[#F4B183] transform translate-x-[6em] translate-y-[4em] rotate-[323deg] animate-[fill3_5s_infinite] bg-no-repeat bg-center bg-[url('../../assets/logos/uamlogo.svg')] bg-[50%]" />
      </div>
    </div>
  );
}

export function ShortLoading() {
  return (
    <div className="relative w-[25px] h-[25px] spinnerContainer">
      <FontAwesomeIcon icon={faSpinner} className="absolute left-0 z-2 w-full h-full spinner" />
    </div>
  );
}


