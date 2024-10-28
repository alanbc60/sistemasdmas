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
import defaultPublicacion from '../../../assets/defaultimages/defaultPublicacion.png';
import filterType from '../../../data/dropdownType.json';
import Swal from 'sweetalert2';

function EditarPublicacion(props) {

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
        const getPublicacionItem = async () => {
            setLoading(true);
            try {
                await axios.get(host + `:3001/get/publicaciones/publicacion-edit`, {
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
                            : error.message
                })
            } finally {
                setLoading(false);
            }
        };

        if (modoEdicion) {
            getPublicacionItem();
        }
    }, [])

    const onSubmit = data => {
        const uploadData = generarFormData(data);
        verInformacionFormulario(uploadData);
        let headers = {
            'Content-Type': 'multipart/form-data'
        };
        if (modoEdicion) {
            const postEditPublicacion = () => {
                if (data.imgchanged) {
                    const editarSiCambiaImagen = () => {
                        setLoading(true)
                        axios.post(host + `:3001/post/publicaciones/edit/image`, uploadData, { headers }).then((res) => {
                            if (res.data !== false) {
                                Swal.fire({
                                    title: '¡Publicación Actualizada Exitosamente!',
                                    html: 'La publicación <strong>' + data.titulo + '</strong> ha sido actualizada correctamente.',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(() => {
                                    navigate("/ver/publicaciones/" + res.data)
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    iconColor: '#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar la publicación con imagen, intenta de nuevo.',
                                })
                            }
                        }).catch((error) => {
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
                        axios.post(host + `:3001/post/publicaciones/edit`, {
                            id: id,
                            titulo: data.titulo,
                            autor: data.autor,
                            anio: data.anio,
                            resumen: data.resumen,
                            tipo: data.tipo,
                            area: 0,
                            enlace: data.enlace,
                            publicarFacebook: data.publicarFacebook,
                            userId: props.usernameId.state
                        }).then((res) => {
                            if (res.data !== false) {
                                Swal.fire({
                                    title: '¡Publicación Actualizada Exitosamente!',
                                    html: 'La publicación <strong>' + data.titulo + '</strong> ha sido actualizada correctamente.',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(() => {
                                    navigate("/ver/publicaciones/" + res.data)
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    iconColor: '#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar la publicación sin imagen, intenta de nuevo.',
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
                title: '¿Estás seguro de que deseas actualizar esta publicación?',
                html: '<strong>' + data.titulo + '</strong> <p>de <i>' + data.autor + '</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Actualizar publicación',
                cancelButtonText: 'Cancelar',
                iconColor: '#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result) => {
                if (result.isConfirmed) {
                    postEditPublicacion();
                }
            })
        } else {
            const postNewPublicacion = () => {
                const agregarPublicacion = () => {
                    setLoading(true)
                    axios.post(host + `:3001/post/publicaciones`, uploadData, { headers }).then((res) => {
                        if (res !== false) {
                            Swal.fire({
                                title: '¡Publicación Agregada Exitosamente!',
                                html: 'La publicación <strong>' + data.titulo + '</strong> ha sido agregada correctamente.',
                                icon: 'success',
                                showConfirmButton: false,
                                backdrop: 'rgba(255,157,5,0.2)',
                                timer: '2500'
                            }).then(() => {
                                navigate("/ver/publicaciones/" + res.data)
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                iconColor: '#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Ocurrió un problema al subir la publicación, intenta de nuevo.',
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
                agregarPublicacion();
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas agregar esta publicación?',
                html: '<strong>' + data.titulo + '</strong> <p>de <i>' + data.autor + '</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar publicación',
                cancelButtonText: 'Cancelar',
                iconColor: '#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result) => {
                if (result.isConfirmed) {
                    postNewPublicacion();
                }
            })
        }


    }
    useEffect(() => {
        reset(item);
    }, [item]);

    const generarFormData = (data) => {
        const uploadData = new FormData();
        if (modoEdicion) uploadData.append('id', id);
        uploadData.append('imagen', data.imagen);
        uploadData.append('titulo', data.titulo);
        uploadData.append('autor', data.autor);
        uploadData.append('anio', data.anio);
        uploadData.append('resumen', data.resumen);
        uploadData.append('tipo', data.tipo);
        uploadData.append('area', 0);
        uploadData.append('enlace', data.enlace);
        uploadData.append('publicarFacebook', data.publicarFacebook);
        uploadData.append('userId', props.usernameId.state);
        return uploadData;
    }
    const verInformacionFormulario = (data) => {
        console.log("Formulario")
        console.log("Id: ", data.get('id'));
        console.log("Imagen: " + data.get('imagen'));
        console.log("Titulo: " + data.get('titulo'));
        console.log("Autor: " + data.get('autor'));
        console.log("Año: " + data.get('anio'));
        console.log("Resumen: " + data.get('resumen'));
        console.log("Tipo: " + data.get('tipo'));
        console.log("Area: " + data.get('area'));
        console.log("Enlace: " + data.get('enlace'));
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
                        <h2 className='text-center'>{id ? 'Editar' : 'Agregar'} Publicación </h2>
                    </header>

                    <section id="seminarioContainer" className="grid place-items-center grid-rows-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <article id="infoSection" className="grid grid-cols-1 md:grid-cols-2 pb-8">
                                <figure id="imgDataSection" className="flex justify-center ">
                                    <VistaPreviaImagen
                                        item={item}
                                        setValue={setValue}
                                        modoEdicion={modoEdicion}
                                        defaultImg={defaultPublicacion} />
                                </figure>


                                <aside id="infoDataSection" className="flex justify-center">
                                    <div className='w-full p-4'>

                                        <p>Título de publicación</p>
                                        <input type="text" className={`w-full ${inputStyle} `} placeholder='Título de publicación' {...register("titulo")} required />

                                        <p>Autor/a</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Autor/a' {...register("autor")} required />


                                        <p>Año</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Año' {...register("anio")} required />


                                        <p  >Enlace (opcional)</p>
                                        <input type="text" className={`w-full ${inputStyle}`} placeholder='Enlace' {...register("enlace")} />

                                        <div className="grid grid-cols-2">

                                            <span>
                                                <p  >Tipo</p>
                                                <select className={`${inputStyle} w-[95%] p-3.5`} {...register("tipo")} required>
                                                    {filterType
                                                        .filter((e) => !e.group)
                                                        .map((e) => (
                                                            <option key={e.id} value={e.type}>{e.filtro}</option>
                                                        ))
                                                        .slice(1)
                                                    }
                                                </select>
                                            </span>

                                            <span>

                                            </span>
                                        </div>
                                    </div>
                                </aside>
                            </article>


                            <aside className="flex justify-center ">
                                <span className="w-[97%]">
                                    <p>Resumen</p>
                                    <textarea className={`${areaStyle} ${inputStyle}`} type="text" placeholder="Resumen"  {...register("resumen")} required />
                                </span>
                            </aside>



                            <aside className='grid grid-cols-[25%_75%] px-5 mt-3 mb-10 '>
                                <span>
                                    <Form.Check className="text-gray-900" type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")} />
                                </span>
                                <span className="flex justify-end">
                                    <button className={`bg-orange-400 hover:bg-orange-200 ${basicBtnStyle} m-3 w-full`} onClick={() => navigate('/publicaciones')}>Regresar</button>

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

const ConnectedEditarPublicacion = connect(mapStateToProps, mapDispatchToProps)(EditarPublicacion);
export default ConnectedEditarPublicacion;