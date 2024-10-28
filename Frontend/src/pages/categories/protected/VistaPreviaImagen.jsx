import React, { useState } from "react";
import Swal from 'sweetalert2';
/**
 * 
 * @param {*} props
 *  item.imagen se espera un string que se la direccion a una imagen
 *  defaultImg se espera un string a una imagen que mostrar, en caso que no llegue la imagen principal
 * setValue actualiza el valor de la imagen en el formulario
 * 
 * @returns Componente que muestra una imagen como vista previa de lo que se va a cargar a la base de datos
 */
export default function VistaPreviaImagen(props) {

    let apiImage = props.item.imagen;
    const imgDefault = props.defaultImg;
    const [imgFile, setImgFile] = useState(apiImage ? apiImage : imgDefault);

    const onImageChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0].size < 30e5) {
            setImgFile(URL.createObjectURL(e.target.files[0]));
            props.setValue("imagen", e.target.files[0])
            props.setValue("imgchanged", true)
        } else {
            Swal.fire({
                icon: 'info',
                iconColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)',
                title: '¡Espera!',
                text: 'El tamaño de la imagen no puede exceder 3MB, intenta de nuevo.',
            })
            e.target.value = "";
        }
    }

    const inputStyle = 'bg-gray-50 block w-full text-gray-900 border border-1 border-orange-100 rounded-lg cursor-pointer file:rounded-md file:border-0 file:cursor-pointer file:hover:bg-orange-200 file:hover:text-gray-500 file:shadow-md file:hover:shadow-md file:transition-colors file:duration-500 file:h-[50px] file:w-[180px] p-3';
    return (
        <figure className='px-3 mx-2'>
            <label htmlFor="archivo">Vista previa (Opcional)</label>
            <img className='w-100' src={imgFile} alt='Vista previa de una imagen' />
            <br />
            <input
                id="archivo"
                name="archivo"
                type="file"
                className={`${inputStyle}`}
                onChange={onImageChange} /> 
            <div className="invalid-feedback pt-3">Example invalid form file feedback</div>

        </figure>
    )
}
