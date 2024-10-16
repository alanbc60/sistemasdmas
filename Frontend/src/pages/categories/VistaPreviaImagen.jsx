import { useState } from "react";
import { Col } from "react-bootstrap";
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
export default function VistaPreviaImagen  (props){
    
    let apiImage = props.item.imagen;
    const imgDefault = props.defaultImg;
    const [imgFile, setImgFile] = useState(apiImage?apiImage: imgDefault);

    const onImageChange = (e) =>{
        console.log(e.target.files[0]);
        if (e.target.files[0].size < 30e5){
            setImgFile(URL.createObjectURL(e.target.files[0]));
            props.setValue("imagen", e.target.files[0])
            props.setValue("imgchanged",true)
        }else{
            Swal.fire({
                icon: 'info',
                iconColor:'#F05757',
                backdrop: 'rgba(255,157,5,0.2)',
                title: '¡Espera!',
                text: 'El tamaño de la imagen no puede exceder 3MB, intenta de nuevo.',
            })
            e.target.value="";
        }
    }

    return(
    <figure className='px-3 mx-2'>
        <label htmlFor="archivo">Vista previa de imagen (Opcional)</label>
        <img className='img-fluid w-100' src={imgFile} alt='Vista previa de una imagen'/>
        <br />
        <Col xs={10}>
            <input id="archivo" name="archivo" type="file" className='form-control mt-4' onChange={onImageChange}/>
            <div className="invalid-feedback">Example invalid form file feedback</div>
        </Col>
    </figure>
    )
}
