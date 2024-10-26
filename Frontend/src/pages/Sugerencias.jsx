import { useState } from "react";
import { host } from '../data/host';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loading } from "../components/generalSections/Loading";
import { useLayoutData } from "../hooks/useLayoutData";
import Header from "../components/generalSections/Header";
import HeaderSection from "../components/generalSections/HeaderSection";
import Footer from "../components/generalSections/Footer";

const initialFormData = {
  nombre: '',
  correo: '',
  sugerencia: ''
}


/**
 * 
 * @returns Componente con formulario NO controlado, lo que se tenga en los inputs será enviado al servidor.
 */
export default function Sugerencias() {

  const {layoutData} = useLayoutData('sugerencias');

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (ev) =>{
    console.log("Entrada: "+ev.target.value);
    setFormData({...formData,
      // este name hace referencia al atributo name del input
      [ev.target.name]: ev.target.value
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.sugerencia == '' || formData.correo == '' || formData.nombre == ''){
      Swal.fire({
        icon: 'error',
        iconColor: '#F05757',
        backdrop: 'rgba(255,157,5,0.2)',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
        footer: 'Por favor, rellene todos los campos'
      })
      return
    }
    else{
      const { nombre, correodecontacto, escribetusugerencia } = Object.fromEntries(
        new window.FormData(e.target)
      )
      sendSugerencia(nombre, correodecontacto, escribetusugerencia)
    }
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
                // Resetear inputs
                setFormData(initialFormData)
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
    <>
      <Header />
      <HeaderSection layoutData={layoutData} />
      <div className="flex flex-col items-center justify-center w-full">
        {loading ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl space-y-6 bg-white p-6 shadow-md rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input de Nombre */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  label="Nombre"
                  onChange={handleChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Input de Correo */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">Correo de contacto</label>
                <input
                  type="email"
                  name="correodecontacto"
                  label="Correo de contacto"
                  onChange={handleChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Área de Texto para sugerencias */}
            <div className="flex flex-col mb-6 ">
              <label className="mb-1 font-semibold text-gray-700">Escribe tu sugerencia</label>
              <textarea
                label="Escribe tu sugerencia"
                name="sugerencia"
                onChange={handleChange}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Botón de Enviar */}
            <div className="flex justify-center">
              <input
                className="border bg-button-submit text-white px-6 py-2 rounded "
                value="Enviar sugerencia/s"
                type="submit" 
              />
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

