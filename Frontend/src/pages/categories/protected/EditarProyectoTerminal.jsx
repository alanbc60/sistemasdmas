import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import axios from 'axios';
import {host} from '../../../data/host';
import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { Loading } from "../../../elements/Loading";
import { Col, Row, Container, Form } from "react-bootstrap";
import VistaPreviaImagen from "../Protected/VistaPreviaImagen";
import defaultTerminal from '../../../assets/defaultimages/defaultTerminal.png';
import Swal from 'sweetalert2';

function EditarProyectoTerminal(props) {

    const navigate = useNavigate();
    
    const [isLoading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
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
        const getProyectoTerminalItem = async () => {
            setLoading(true);
            try{
                await axios.get(host+`:3001/get/proyectosterminales/proyectoterminal-edit`,{
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
                            :error
                })
            }finally {
                setValue('youtube',"");
                setLoading(false);
            }
        };
        if(modoEdicion){
            getProyectoTerminalItem(); 
        }
    },[])

    useEffect(() => {
        reset(item);
    }, [item]);

    const onSubmit = data => {
        const uploadData = generarFormData(data);
        verInformacionFormulario(uploadData);
        let headers = {
            'Content-Type':'multipart/form-data'
        };
        if(modoEdicion){
            const postEditProyecto = ()=>{
                if(data.imgchanged){
                    const editarSiCambiaImagen =()=>{
                        setLoading(true)
                        axios.post(host+`:3001/post/proyectosterminales/edit/image`,uploadData,{ headers }).then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Proyecto Actualizado Exitosamente!',
                                    html: 'El proyecto <strong>'+data.titulo+'</strong> ha sido actualizado correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(()=>{
                                    navigate("/ver/proyectosterminales/"+res.data)
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar el proyecto con imagen, intenta de nuevo.',
                                })
                            }
                        })
                        .catch((error)=>{
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
                        axios.post(host+`:3001/post/proyectosterminales/edit`,{
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
                        }).then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Proyecto Actualizado Exitosamente!',
                                    html: 'El proyecto <strong>'+data.titulo+'</strong> ha sido actualizado correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(()=>{
                                    navigate("/ver/proyectosterminales/"+res.data)
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar el proyecto sin imagen, intenta de nuevo.',
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
                title: '¿Estás seguro de que deseas actualizar este proyecto?',
                html: '<strong>'+data.titulo+'</strong> <p>de <i>'+data.asesores+'</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Actualizar proyecto',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    postEditProyecto();
                }
            })
        }else{
            const postNewProyecto = ()=>{
                const agregarProyecto = ()=>{
                    setLoading(true)
                    axios.post(host+`:3001/post/proyectosterminales`,uploadData,{ headers }).then((res)=>{
                        if(res!==false){
                            Swal.fire({
                                title:'¡Proyecto Agregado Exitosamente!',
                                html: 'El proyecto <strong>'+data.titulo+'</strong> ha sido agregado correctamente.',
                                icon:'success',
                                showConfirmButton: false,
                                backdrop: 'rgba(255,157,5,0.2)',
                                timer: '2500'
                            }).then(()=>{
                                navigate("/ver/proyectosterminales/"+res.data)
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                iconColor:'#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Ocurrió un problema al publicar el proyecto, intenta de nuevo.',
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
                agregarProyecto();
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas agregar este proyecto?',
                html: '<strong>'+data.titulo+'</strong> <p>de <i>'+data.asesores+'</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar proyecto',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    postNewProyecto();
                }    
            })
        }
    }

    const generarFormData = (data) =>{
        const uploadData = new FormData();
        if(modoEdicion) uploadData.append('id',id);
        uploadData.append('imagen',data.imagen);
        uploadData.append('titulo',data.titulo);
        uploadData.append('asesores',data.asesores);
        uploadData.append('autores',data.autores);
        uploadData.append('youtube',data.youtube);
        uploadData.append('fechapublicacion',data.fechapublicacion);
        uploadData.append('area',data.area);
        uploadData.append('objetivo',data.objetivo);
        uploadData.append('tesina',data.tesina);
        uploadData.append('publicarFacebook',data.publicarFacebook);
        uploadData.append('userId',props.usernameId.state);
        return uploadData;
    }

    const verInformacionFormulario = (data) =>{
        console.log("Formulario")
        console.log("Id: ",data.get('id'));
        console.log("Imagen: "+data.get('imagen')); 
        console.log("Titulo: "+data.get('titulo')); 
        console.log("Asesores: "+data.get('asesores')); 
        console.log("Autores: "+data.get('autores')); 
        console.log("Youtube: "+data.get('youtube')); 
        console.log("Fecha de publicación: "+data.get('fechapublicacion')); 
        console.log("Area: "+data.get('area'));
        console.log("Objetivo: "+data.get('objetivo'));  
        console.log("Tesina: "+data.get('tesina')); 
        console.log("PublicarFacebook: "+data.get('publicarFacebook')); 
    }

    return (
        <div>
        { isLoading? <Loading/>:
            <Container>
                <Row className='my-5'>
                    <Container className='m-0 p-0'>
                        <h2 className='text-center'>{modoEdicion?'Editar':'Agregar'} Proyecto Terminal</h2>
                    </Container>
                </Row>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs={6}>
                                <Container>
                                    <VistaPreviaImagen item={item} setValue={setValue} modoEdicion={modoEdicion} defaultImg={defaultTerminal}/>
                                </Container>        
                            </Col>
                            <Col xs={6}>
                                <Container>
                                    <div className='px-3 mx-2'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Título de proyecto terminal</Form.Label>
                                            <input type="text" className='form-control' placeholder='Título de proyecto terminal' {...register("titulo")} required  />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Asesores</Form.Label>
                                            <input  type="text" className='form-control' placeholder='Asesores' {...register("asesores")} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Autores</Form.Label>
                                            <input  type="text" className='form-control' placeholder='Autores' {...register("autores")} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Enlace de YouTube (opcional)</Form.Label>
                                            <input  type="text" className='form-control' placeholder='Enlace de YouTube' {...register("youtube")}  />
                                        </Form.Group>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Fecha de publicación</Form.Label>
                                                    <input  type="date" className='form-control' {...register("fechapublicacion")} required />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group >
                                                    <Form.Label>Área</Form.Label>
                                                    <select className="form-select" {...register("area")} required>
                                                        <option value="1">Ingeniería en Computación</option>
                                                        <option value="2">Matemáticas Aplicadas</option>
                                                        <option value="3">Otro</option>
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                            </Col>
                        </Row>
                        <Row className='px-5 my-3'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Objetivo</Form.Label>
                                <textarea className='form-control' rows="5" type="text" placeholder="Objetivo"  {...register("objetivo")} required/>
                            </Form.Group>
                        </Row>
                        <Row className='px-5 my-3'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Resumen</Form.Label>
                                <textarea className='form-control' rows="5" type="text" placeholder="Resumen"  {...register("tesina")} required/>
                            </Form.Group>
                        </Row>
                        <Row className='px-5 mt-3 mb-5'>
                            <Col className="col-5">
                                <Form.Check type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")}/>
                            </Col>
                            <Col>              
                                <Row className='justify-content-around align-items-end'>
                                    <Col>
                                        <div className='button-nav btn btn-secondary btn-lg' onClick={() => navigate('/proyectosterminales')}>Regresar</div>
                                    </Col>
                                    <Col>
                                        <input type="submit" value={modoEdicion?'Actualizar':"Publicar"} className='button-submit btn-primary btn-lg'/>
                                    </Col>
                                </Row>      
                            </Col>
                        </Row>
                    </form>
                </Container>  
            </Container>
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
