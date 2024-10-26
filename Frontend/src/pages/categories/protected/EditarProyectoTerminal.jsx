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
import defaultTerminal from '../../../assets/defaultimages/defaultTerminal.png';
import Swal from 'sweetalert2';

function EditarProyectoTerminal(props) {
    console.log("userid", props.usernameId.state);
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const { id } = useParams();
    let modoEdicion = id ? true : false;

    const { register, reset, setValue, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return item;
        }, [item])
    });

    useEffect(() => {
        register("imagen");
        register("imgchanged", false);
        const getProyectoTerminalItem = async () => {
            setLoading(true);
            try {
                await axios.get(host + `:3001/get/proyectosterminales/proyectoterminal-edit`, {
                    params: { id: id }
                }).then(
                    res => {
                        setItem(res.data);

                    }
                );
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    iconColor: '#F05757',
                    backdrop: 'rgba(255,157,5,0.2)',
                    title: 'Oops...',
                    text: 'Parece que hubo un problema.',
                    showConfirmButton: false,
                    timer: '2500',
                    footer: error.message === 'Network Error' ? 'Intente más tarde' :
                        error.message === 'Request failed with status code 500' ? 'Error interno del servidor (500)'
                            : error
                })
            } finally {
                setValue('youtube', "");
                setLoading(false);
            }
        };
        if (modoEdicion) {
            getProyectoTerminalItem();
        }
    }, [])

    useEffect(() => {
        reset(item);
    }, [item]);

    const onSubmit = data => {
        const uploadData = generarFormData(data);
        verInformacionFormulario(uploadData);
        let headers = {
            'Content-Type': 'multipart/form-data'
        };
        if (modoEdicion) {
            const postEditProyecto = () => {
                if (data.imgchanged) {
                    const editarSiCambiaImagen = () => {
                        setLoading(true)
                        axios.post(host + `:3001/post/proyectosterminales/edit/image`, uploadData, { headers }).then((res) => {
                            if (res.data !== false) {
                                Swal.fire({
                                    title: '¡Proyecto Actualizado Exitosamente!',
                                    html: 'El proyecto <strong>' + data.titulo + '</strong> ha sido actualizado correctamente.',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(() => {
                                    navigate("/ver/proyectosterminales/" + res.data)
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    iconColor: '#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar el proyecto con imagen, intenta de nuevo.',
                                })
                            }
                        })
                            .catch((error) => {
                                Swal.fire({
                                    icon: 'error',
                                    iconColor: '#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Parece que hubo un problema.',
                                    showConfirmButton: false,
                                    timer: '2500',
                                    footer: error.message === 'Network Error' ? 'Intente más tarde' :
                                        error.message === 'Request failed with status code 500' ? 'Error interno del servidor (500)'
                                            : error.message
                                })
                            }).finally(() => {
                                setLoading(false)
                            })
                    }
                    editarSiCambiaImagen();
                } else { //Si se edita sin alterar la imagen, no se puede usar FormData, se envian de forma individual.
                    const editarSinAlterarImagen = () => {
                        setLoading(true)
                        axios.post(host + `:3001/post/proyectosterminales/edit`, {
                            id: id,
                            titulo: data.titulo,
                            asesores: data.asesores,
                            autores: data.autores,
                            youtube: data.youtube,
                            fechapublicacion: data.fechapublicacion,
                            area: data.area,
                            objetivo: data.objetivo,
                            tesina: data.tesina,
                            publicarFacebook: data.publicarFacebook,
                            userId: props.usernameId.state
                        }).then((res) => {
                            if (res.data !== false) {
                                Swal.fire({
                                    title: '¡Proyecto Actualizado Exitosamente!',
                                    html: 'El proyecto <strong>' + data.titulo + '</strong> ha sido actualizado correctamente.',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(() => {
                                    navigate("/ver/proyectosterminales/" + res.data)
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    iconColor: '#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar el proyecto sin imagen, intenta de nuevo.',
                                })
                            }
                        }).catch(
                            (error) => {
                                Swal.fire({
                                    icon: 'error',
                                    iconColor: '#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Parece que hubo un problema.',
                                    showConfirmButton: false,
                                    timer: '2500',
                                    footer: error.message === 'Network Error' ? 'Intente más tarde' :
                                        error.message === 'Request failed with status code 500' ? 'Error interno del servidor (500)'
                                            : error.message
                                })
                            }
                        ).finally(() => {
                            setLoading(false)
                        })
                    }
                    editarSinAlterarImagen();
                }
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas actualizar este proyecto?',
                html: '<strong>' + data.titulo + '</strong> <p>de <i>' + data.asesores + '</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Actualizar proyecto',
                cancelButtonText: 'Cancelar',
                iconColor: '#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result) => {
                if (result.isConfirmed) {
                    postEditProyecto();
                }
            })
        } else {
            const postNewProyecto = () => {
                const agregarProyecto = () => {
                    setLoading(true)
                    axios.post(host + `:3001/post/proyectosterminales`, uploadData, { headers }).then((res) => {
                        if (res !== false) {
                            Swal.fire({
                                title: '¡Proyecto Agregado Exitosamente!',
                                html: 'El proyecto <strong>' + data.titulo + '</strong> ha sido agregado correctamente.',
                                icon: 'success',
                                showConfirmButton: false,
                                backdrop: 'rgba(255,157,5,0.2)',
                                timer: '2500'
                            }).then(() => {
                                navigate("/ver/proyectosterminales/" + res.data)
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                iconColor: '#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Ocurrió un problema al publicar el proyecto, intenta de nuevo.',
                            })
                        }
                    }).catch(
                        (error) => {
                            Swal.fire({
                                icon: 'error',
                                iconColor: '#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Parece que hubo un problema.',
                                showConfirmButton: false,
                                timer: '2500',
                                footer: error.message === 'Network Error' ? 'Intente más tarde' :
                                    error.message === 'Request failed with status code 500' ? 'Error interno del servidor (500)'
                                        : error.message
                            })
                        }).finally(() => {
                            setLoading(false)
                        })
                }
                agregarProyecto();
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas agregar este proyecto?',
                html: '<strong>' + data.titulo + '</strong> <p>de <i>' + data.asesores + '</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar proyecto',
                cancelButtonText: 'Cancelar',
                iconColor: '#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result) => {
                if (result.isConfirmed) {
                    postNewProyecto();
                }
            })
        }
    }

    const generarFormData = (data) => {
        const uploadData = new FormData();
        if (modoEdicion) uploadData.append('id', id);
        uploadData.append('imagen', data.imagen);
        uploadData.append('titulo', data.titulo);
        uploadData.append('asesores', data.asesores);
        uploadData.append('autores', data.autores);
        uploadData.append('youtube', data.youtube);
        uploadData.append('fechapublicacion', data.fechapublicacion);
        uploadData.append('area', data.area);
        uploadData.append('objetivo', data.objetivo);
        uploadData.append('tesina', data.tesina);
        uploadData.append('publicarFacebook', data.publicarFacebook);
        uploadData.append('userId', props.usernameId.state);
        return uploadData;
    }

    const verInformacionFormulario = (data) => {
        console.log("Formulario")
        console.log("Id: ", data.get('id'));
        console.log("Imagen: " + data.get('imagen'));
        console.log("Titulo: " + data.get('titulo'));
        console.log("Asesores: " + data.get('asesores'));
        console.log("Autores: " + data.get('autores'));
        console.log("Youtube: " + data.get('youtube'));
        console.log("Fecha de publicación: " + data.get('fechapublicacion'));
        console.log("Area: " + data.get('area'));
        console.log("Objetivo: " + data.get('objetivo'));
        console.log("Tesina: " + data.get('tesina'));
        console.log("PublicarFacebook: " + data.get('publicarFacebook'));
    }
    const basicBtnStyle = 'block text-white text-center border border-1 border-orange-100 rounded-lg cursor-pointer border-0 hover:text-gray-400 shadow-md hover:shadow-lg transition-colors duration-500 p-3 max-w-[200px] max-h-[50px]';
    const areaStyle = 'w-full border rounded-lg min-h-[90px] ';
    const inputStyle = 'bg-gray-50 block border border-1 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-500 mb-3 p-3';
    
    return (
        <div className="flex justify-center min-w-[500px]">
            {isLoading ? <Loading /> :
                <main id="principalSeminario" className="w-[80%]">
                    <header className='m-0 p-0 my-5'>
                        <h2 className='text-center'>{id ? 'Editar' : 'Agregar'} Proyecto Terminal</h2>
                    </header>

                    <section id="seminarioContainer" className="grid place-items-center grid-rows-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <article id="infoSection" className="grid grid-cols-1 md:grid-cols-2 pb-8">
                                <figure id="imgDataSection" className="flex justify-center ">
                                    <VistaPreviaImagen
                                        item={item}
                                        setValue={setValue}
                                        modoEdicion={modoEdicion}
                                        defaultImg={defaultTerminal} />
                                </figure>


                                <aside id="infoDataSection" className="flex justify-center">
                                    <div className='w-full p-4'>

                                        <p>Título de proyecto terminal</p>
                                        <input type="text" className={`w-full ${inputStyle} `} placeholder='Título de proyecto terminal' {...register("titulo")} required />

                                        <p  >Asesores</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Asesores' {...register("asesores")} required />


                                        <p  >Autores</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Autores' {...register("autores")} required />


                                        <p  >Enlace de YouTube (opcional)</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Enlace de YouTube' {...register("youtube")} />


                                        <div className="grid grid-cols-2">

                                            <span>
                                                <p >Fecha de publicación</p>
                                                <input
                                                    type="date"
                                                    className={`${inputStyle} w-[90%]`}
                                                    {...register("fechapublicacion")} required />
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
                                    <p>Objetivo</p>
                                    <textarea className={`${areaStyle} ${inputStyle}`} type="text" placeholder="Objetivo"  {...register("objetivo")} required />
                                    <p>Resumen</p>
                                    <textarea className={`${areaStyle} ${inputStyle}`} type="text" placeholder="Resumen"  {...register("tesina")} required />
                                </span>
                            </aside>



                            <aside className='grid grid-cols-[25%_75%] px-5 mt-3 mb-10 '>
                                <span>
                                    <Form.Check className="text-gray-900" type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")} />
                                </span>
                                <span className="flex justify-end">
                                    <button className={`bg-orange-400 hover:bg-orange-200 ${basicBtnStyle} m-3 w-full`} onClick={() => navigate('/proyectosterminales')}>Regresar</button>

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

const ConnectedEditarProyectoTerminal = connect(mapStateToProps, mapDispatchToProps)(EditarProyectoTerminal);
export default ConnectedEditarProyectoTerminal;
