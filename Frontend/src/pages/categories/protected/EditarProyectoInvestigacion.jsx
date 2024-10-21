import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import axios from 'axios';
import {host} from '../../../data/host';
import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { Loading } from "../../../elements/Loading";
import { Col, Row, Container, Form } from "react-bootstrap";
import VistaPreviaImagen from "../protected/VistaPreviaImagen";
import defaultInvestigacion from '../../../assets/defaultimages/defaultInvestigacion.png'
import Swal from 'sweetalert2';

function EditarProyectoInvestigacion(props) {

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
        const getProyectoInvestigacionItem = async () => {
            setLoading(true);
            try{
                await axios.get(host+`:3001/get/proyectosinvestigacion/proyectoinvestigacion-edit`,{
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
            getProyectoInvestigacionItem(); 
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
        if(modoEdicion){ // /ver/publicaciones/
            const postEditProyecto = ()=>{
                if(data.imgchanged){
                    const editarSiCambiaImagen = ()=>{
                        setLoading(true)
                        axios.post(host+`:3001/post/proyectosinvestigacion/edit/image`,uploadData,{ headers }).then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Proyecto Actualizado Exitosamente!',
                                    html: 'El proyecto <strong>'+data.titulo+'</strong> ha sido actualizado correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(()=>{
                                    navigate("/ver/proyectosinvestigacion/"+res.data)
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
                        axios.post(host+`:3001/post/proyectosinvestigacion/edit`,{
                            id: id,
                            titulo: data.titulo,
                            responsable: data.responsable,
                            participantes: data.participantes,
                            fechainicio: data.fechainicio,
                            fechaactualizacion: data.fechaactualizacion,
                            area: 0,
                            objetivo: data.objetivo,
                            enlace: data.enlace,
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
                                    navigate("/ver/proyectosinvestigacion/"+res.data)
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
                html: '<strong>'+data.titulo+'</strong> <p>de <i>'+data.responsable+'</i></p>',
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
                    axios.post(host+`:3001/post/proyectosinvestigacion`,uploadData,{ headers }).then((res)=>{
                        if(res!==false){
                            Swal.fire({
                                title:'¡Proyecto Agregado Exitosamente!',
                                html: 'El proyecto <strong>'+data.titulo+'</strong> ha sido agregado correctamente.',
                                icon:'success',
                                showConfirmButton: false,
                                backdrop: 'rgba(255,157,5,0.2)',
                                timer: '2500'
                            }).then(()=>{
                                navigate("/ver/proyectosinvestigacion/"+res.data)
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
                html: '<strong>'+data.titulo+'</strong> <p>de <i>'+data.responsable+'</i></p>',
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
        uploadData.append('responsable',data.responsable);
        uploadData.append('participantes',data.participantes);
        uploadData.append('enlace',data.enlace);
        uploadData.append('fechainicio',data.fechainicio);
        uploadData.append('fechaactualizacion',data.fechaactualizacion);
        uploadData.append('area',0);
        uploadData.append('objetivo',data.objetivo);
        uploadData.append('publicarFacebook',data.publicarFacebook);
        uploadData.append('userId',props.usernameId.state);
        return uploadData;
    }

    const verInformacionFormulario = (data) =>{
        console.log("Formulario")
        console.log("Id: ",data.get('id'));
        console.log("Imagen: "+data.get('imagen')); 
        console.log("Titulo: "+data.get('titulo')); 
        console.log("Responsable: "+data.get('responsable')); 
        console.log("Participantes: "+data.get('participantes')); 
        console.log("Enlace: "+data.get('enlace')); 
        console.log("FechaInicio: "+data.get('fechainicio'));
        console.log("FechaActualizacion: "+data.get('fechaactualizacion'));  
        console.log("Objetivo: "+data.get('objetivo'));
        console.log("Area: "+data.get('area')); 
        console.log("PublicarFacebook: "+data.get('publicarFacebook')); 
    }

    return (
        <div>
            {isLoading? <Loading/>:
            <Container>
                <Row className='my-5'>
                    <Container className='m-0 p-0'>
                        <h2 className='text-center'>{modoEdicion?"Editar Proyecto de Investigación":"Agregar Proyecto de Investigación"}</h2>
                    </Container>
                </Row>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs={5}>
                                <Container>
                                    <VistaPreviaImagen item={item} setValue={setValue} modoEdicion={modoEdicion} defaultImg={defaultInvestigacion}/>
                                </Container>        
                            </Col>
                            <Col xs={7}>
                                <Container>
                                    <div className='px-3 mx-2'>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Título de proyecto de investigación</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Título de proyecto de investigación' {...register("titulo")} required />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Profesor/a</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Profesor/a' {...register("responsable")} required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Participantes</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Participantes' {...register("participantes")} required />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Enlace (Opcional)</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Enlace' {...register("enlace")} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Fecha de inicio</Form.Label>
                                                    <input  type="date" className='form-control' {...register("fechainicio")} required />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Fecha de término</Form.Label>
                                                    <input type="date" className='form-control' {...register("fechaactualizacion")} required />
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
                        <Row className='px-5 mt-3 mb-5'>
                            <Col>
                                <Form.Check type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")}/>
                            </Col>
                            <Col>              
                                <Row className='justify-content-around align-items-end'>
                                    <Col>
                                        <div className='button-nav btn btn-secondary btn-lg' onClick={() => navigate('/proyectosinvestigacion')}>Regresar</div>
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

const ConnectedEditarInvestigacion = connect(mapStateToProps, mapDispatchToProps)(EditarProyectoInvestigacion);
export default ConnectedEditarInvestigacion;
