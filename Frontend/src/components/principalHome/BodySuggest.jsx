import React from 'react'
import mailIcon from '../../assets/icons/email.png';
import teamicon from '../../assets/icons/team.png';
import { ButtonLink, ButtonNav } from '../../elements/Buttons';
import { useParams } from 'react-router-dom';


export default function BodyFooter() {
  const { section, categoria } = useParams()
  if (section || categoria) return null
  return (
    //section-footer


    <footer id='section-footer' className={`grid sm:grid-cols-1 md:grid-cols-2 bg:grid-cols-2 w-full place-items-center gap-4 p-4 bg-body-footer-img bg-cover bg-center bg-fixed min-w-[500px]`}>
        {/* section-footer-div */}
        <div className="flex flex-col items-center">
          <img className="max-w-[6.25rem]" src={mailIcon} alt="icono de correo"/>
            <p className="text-white font-normal text-center text-base">¿Sugerencias?</p>
            <ButtonNav className='flex justify-center w-full' label={'Escríbenos'} path={'/sugerencias'} />
        </div>
        <div className="flex flex-col items-center">
          <img className="max-w-[6.25rem]" src={teamicon} alt="icono con tres dibujos de personas"/>
            <p className="text-white font-normal text-center text-base">Conoce a los integrantes del departamento.</p>
            <ButtonLink className='flex justify-center w-full' label={'Integrantes del Departamento'} path={'http://dcni.cua.uam.mx/departamentos/matematicas#personal'} />
        </div>
    </footer>
  )
}
