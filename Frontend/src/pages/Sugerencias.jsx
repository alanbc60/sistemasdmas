/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { SubmitInput } from "../../../elements/Buttons";
import { TextAreaInput, TextInput } from "../../../elements/Inputs";
import { host } from '../../../data/host';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loading } from "../../../elements/Loading";

/**
 * 
 * @returns Componente con formulario NO controlado, lo que se tenga en los inputs será enviado al servidor.
 */
export default function Sugerencias() {
  const [resetInputs, setResetInputs] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correodecontacto, escribetusugerencia } = Object.fromEntries(
      new window.FormData(e.target)
    )
    sendSugerencia(nombre, correodecontacto, escribetusugerencia)
  }

  const handleNewSubmit = () => {
    setResetInputs(false)
  }
  const sendSugerencia = async (nombre, correo, sugerencia) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas enviar esta sugerencia?',
      html: '<strong>' + nombre + '</strong>, tu sugerencia es:<i><p>' + sugerencia + '</p></i>',
      icon: 'question',
      iconColor: '#FFD6A5',
      showCancelButton: true,
      confirmButtonText: 'Enviar Sugerencia',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00C3DB',
      cancelButtonColor: '#F05757',
      backdrop: 'rgba(255,157,5,0.2)'
    }).then((result) => {
      if (result.isConfirmed) {
        const postSugerencia = async () => {
          try {
            setLoading(true)
            await axios.post(host + `:3001/post/sugerencia`, {
              nombre: nombre,
              correo: correo,
              sugerencia: sugerencia
            }).then((result) => {
              if (result.data) {
                Swal.fire({
                  title: 'Enviado',
                  html: '<strong>' + nombre + '</strong> ¡Gracias por tu sugerencia! Valoramos tu contribución y la tendremos en cuenta para mejorar nuestro servicio.',
                  icon: 'success',
                  showConfirmButton: false,
                  backdrop: 'rgba(255,157,5,0.2)',
                  timer: '4000'
                })
                setResetInputs(true)
              }
              console.log(result.statusText)
            })
          } catch (error) {
            Swal.fire({
              icon: 'error',
              iconColor: '#F05757',
              backdrop: 'rgba(255,157,5,0.2)',
              title: 'Oops...',
              text: 'Parece que hubo un problema',
              footer: error.message === 'Network Error' ? 'Intente más tarde' : error.message
            })
          } finally {
            setLoading(false)
          }
        }
        postSugerencia();
      }
    })
  }

  return (
    <div id='sugerencias-container'>
      {loading ? <Loading /> :
        <form onSubmit={handleSubmit} id='sugerencias'>
          <div id='sugerencias-info'>
            <TextInput label={'Nombre'} resetInputs={resetInputs} handleNewSubmit={handleNewSubmit} />
            <TextInput label={'Correo de contacto'} resetInputs={resetInputs} handleNewSubmit={handleNewSubmit} />
          </div>
          <TextAreaInput label={'Escribe tu sugerencia'} rowsNumber={8} resetInputs={resetInputs} handleNewSubmit={handleNewSubmit} />
          <SubmitInput value={'Enviar sugerencia/s'} />
        </form>
      }
    </div>
  )
}

