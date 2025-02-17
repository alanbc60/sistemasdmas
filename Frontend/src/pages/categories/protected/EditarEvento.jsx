import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import axios from 'axios';
import {host} from '../../../data/host';
import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { Loading } from "../../../components/generalSections/Loading";
import { Col, Row, Container, Form } from "react-bootstrap";
import VistaPreviaImagen from "./VistaPreviaImagen";
import defaultEventos from '../../../assets/defaultimages/defaultEvento.png'
import Swal from 'sweetalert2';

function EditarEvento(props) {
    
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    let modoEdicion = id ? true:false;

    const { register,reset, setValue, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return item;
          }, [item])
    });
    useEffect(()=>{
        register( "imagen" );
        register( "imgchanged", false );
        const getEventoItem = async () => {
            setLoading(true);
            try{
                await axios.get(host+`:3001/get/eventos/evento-edit`,{
                    params:{ id: id}
                    }).then(
                        res =>{
                            setItem(res.data);  
                        } 
                );
            }catch (error) {
                Swal.fire({
                    icon: 'error',
                    iconColor:'#F05757',
                    backdrop: 'rgba(255,157,5,0.2)',
                    title: 'Oops...',
                    text: 'Parece que hubo un problema.',
                    showConfirmButton: false,
                    timer: '2500',
                    footer: error.message === 'Network Error'? 'Intente más tarde': 
                            error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                            :error.message
                })
            }finally {
                setLoading(false);
            }
        };

        if(modoEdicion){
            getEventoItem(); 
        }
    },[id, modoEdicion, register]);

    useEffect(() => {
        reset(item);
    }, [item, reset]);

    
    const onSubmit = data => {
        const uploadData = generarFormData(data);
        verInformacionFormulario(uploadData);
        let headers = {
            'Content-Type':'multipart/form-data'
        };
        if(modoEdicion){
            const postEditEvento = ()=>{
                if(data.imgchanged){
                    const editarSiCambiaImagen = ()=>{
                        setLoading(true)
                        axios.post(host+`:3001/post/eventos/edit/image`,uploadData,{ headers })
                        .then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Evento Actualizado Exitosamente!',
                                    html: 'El evento <strong>'+data.titulo+'</strong> ha sido actualizado correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar el evento con imagen, intenta de nuevo.',
                                })
                            }
                        }).catch((error)=>{
                            Swal.fire({
                                icon: 'error',
                                iconColor:'#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Parece que hubo un problema.',
                                showConfirmButton: false,
                                timer: '2500',
                                footer: error.message === 'Network Error'? 'Intente más tarde': 
                                        error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                        :error.message
                            })
                        }).finally(()=>{
                            setLoading(false)
                        })
                    }
                    editarSiCambiaImagen();
                }else{ //Si se edita sin alterar la imagen, no se puede usar FormData, se envian de forma individual.
                    const editarSinAlterarImagen = ()=>{
                        setLoading(true)
                        axios.post(host+`:3001/post/eventos/edit`,{
                            id: id,
                            titulo: data.titulo,
                            organizador: data.organizador,
                            lugar: data.lugar,
                            fecha: data.fecha,
                            area: data.area,
                            descripcion: data.descripcion,
                            publicarFacebook: data.publicarFacebook,
                            userId: props.usernameId.state
                        }).then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Evento Actualizado Exitosamente!',
                                    html: 'El evento <strong>'+data.titulo+'</strong> ha sido actualizado correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(()=>{
                                    navigate("/ver/eventos/"+res.data)
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar el evento sin imagen, intenta de nuevo.',
                                })
                            }
                        }).catch(
                            (error)=>{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Parece que hubo un problema.',
                                    showConfirmButton: false,
                                    timer: '2500',
                                    footer: error.message === 'Network Error'? 'Intente más tarde': 
                                            error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                            :error.message
                                })
                            }
                        ).finally(()=>{
                            setLoading(false)
                        })
                    }
                    editarSinAlterarImagen();
                }
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas actualizar este evento?',
                html: '<strong>'+data.titulo+'</strong> <p>Organizado por: <i>'+data.organizador+'</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Actualizar evento',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                postEditEvento();
                }
            })
        }else{
            const postNewEvento = ()=>{
                const agregarEvento = ()=>{
                    setLoading(true)
                    axios.post(host+`:3001/post/eventos`,uploadData,{ headers }).then((res)=>{
                        if(res!==false){
                            Swal.fire({
                                title:'¡Evento Agregado Exitosamente!',
                                html: 'El evento <strong>'+data.titulo+'</strong> ha sido agregado correctamente.',
                                icon:'success',
                                showConfirmButton: false,
                                backdrop: 'rgba(255,157,5,0.2)',
                                timer: '2500'
                            }).then(()=>{
                                navigate("/ver/eventos/"+res.data)
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                iconColor:'#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Ocurrió un problema al publicar el evento, intenta de nuevo.',
                            })
                        }
                    }).catch(
                        (error) => {
                            Swal.fire({
                                icon: 'error',
                                iconColor:'#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Parece que hubo un problema.',
                                showConfirmButton: false,
                                timer: '2500',
                                footer: error.message === 'Network Error'? 'Intente más tarde': 
                                        error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                        :error.message
                            })
                    }).finally(()=>{
                        setLoading(false)
                    })
                }
                agregarEvento();
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas agregar este evento?',
                html: '<strong>'+data.titulo+'</strong> <p>Organizado por: <i>'+data.organizador+'</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar evento',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    postNewEvento();
                }    
            })
        }
    }
    

    const generarFormData = (data) =>{
        const uploadData = new FormData();
        if(modoEdicion) uploadData.append('id',id);
        uploadData.append('imagen',data.imagen);
        uploadData.append('titulo',data.titulo);
        uploadData.append('organizador',data.organizador);
        uploadData.append('lugar',data.lugar);
        uploadData.append('fecha',data.fecha);
        uploadData.append('area',data.area);
        uploadData.append('descripcion',data.descripcion);
        uploadData.append('publicarFacebook',data.publicarFacebook);
        uploadData.append('userId',props.usernameId.state);
        return uploadData;
    }

    const verInformacionFormulario = (data) =>{
        console.log("Formulario")
        console.log("Id: ",data.get('id'));
        console.log("Imagen: "+data.get('imagen')); 
        console.log("Titulo: "+data.get('titulo')); 
        console.log("Organizador: "+data.get('organizador')); 
        console.log("lugar: "+data.get('lugar')); 
        console.log("Fecha: "+data.get('fecha'));
        console.log("Descripcion: "+data.get('descripcion')); 
        console.log("Area: "+data.get('area')); 
        console.log("PublicarFacebook: "+data.get('publicarFacebook'));
    }

    const basicBtnStyle = 'block text-white text-center border border-1 border-orange-100 rounded-lg cursor-pointer border-0 hover:text-gray-400 shadow-md hover:shadow-lg transition-colors duration-500 p-3 max-w-[200px] max-h-[50px]';
    const areaStyle = 'w-full border rounded-lg min-h-[90px] ';
    const inputStyle = 'bg-gray-50 block border border-1 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-500 mb-3 p-3';
    
    return (
        <div className="flex justify-center min-w-[500px]">
            {isLoading ? <Loading /> :
                <main id="principalSeminario" className="w-[80%]">
                    <header className='m-0 p-0 my-5'>
                        <h2 className='text-center'>{id ? 'Editar' : 'Agregar'} Evento </h2>
                    </header>
    
                    <section id="seminarioContainer" className="grid place-items-center grid-rows-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
    
                            <article id="infoSection" className="grid grid-cols-1 md:grid-cols-2 pb-8">
                                <figure id="imgDataSection" className="flex justify-center ">
                                    <VistaPreviaImagen
                                        item={item}
                                        setValue={setValue}
                                        modoEdicion={modoEdicion}
                                        defaultImg={defaultEventos} />
                                </figure>
    
    
                                <aside id="infoDataSection" className="flex justify-center">
                                    <div className='w-full p-4'>
    
                                        <p>Título de evento</p>
                                        <input type="text" className={`w-full ${inputStyle} `} placeholder='Título de evento' {...register("titulo")} required />
    
                                        <p>Organizador</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Organizador' {...register("organizador")} required />
    
    
                                        <p>Lugar</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Lugar' {...register("lugar")} required />
    
                                        <div className="grid grid-cols-2">
    
                                            <span>
                                                <p >Fecha</p>
                                                <input
                                                    type="date"
                                                    className={`${inputStyle} w-[90%]`}
                                                    {...register("fecha")} required />
                                            </span>
    
                                            <span>
                                                <p  >Área</p>
                                                <select
                                                    className={`${inputStyle} w-[95%] p-3.5`}
                                                    {...register("area")} required>
                                                    <option value="1">Ingeniería en Computación</option>
                                                    <option value="2">Matemáticas Aplicadas</option>
                                                    <option value="3">Otro</option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </aside>
                            </article>
    
    
                            <aside className="flex justify-center ">
                                <span className="w-[97%]">
                                    <p>Descripción</p>
                                    <textarea className={`${areaStyle} ${inputStyle}`} type="text" placeholder="Descripción"  {...register("descripcion")} required/>
                                </span>
                            </aside>
    
    
    
                            <aside className='grid grid-cols-[25%_75%] px-5 mt-3 mb-10 '>
                                <span>
                                    <Form.Check className="text-gray-900" type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")} />
                                </span>
                                <span className="flex justify-end">
                                    <button className={`bg-orange-400 hover:bg-orange-200 ${basicBtnStyle} m-3 w-full`} onClick={() => navigate('/eventos')}>Regresar</button>
    
                                    <input type="submit" value={modoEdicion ? 'Actualizar' : "Publicar"} className={`bg-blue-400 hover:bg-blue-200 ${basicBtnStyle} m-3 w-full`} />
                                </span>
    
    
                            </aside>
    
                        </form>
                    </section>
                </main>
            }
        </div>
    )
    

}

const mapStateToProps = (state) =>{
    return{
        usernameId: state.usernameId,
        logged: state.logged,
    };
};

const mapDispatchToProps ={
    toggleLogin,
};
const ConnectedEditarEvento = connect(mapStateToProps, mapDispatchToProps)(EditarEvento);
export default ConnectedEditarEvento 