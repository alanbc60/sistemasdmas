import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import axios from 'axios';
import {host} from '../../data/host';
import toggleLogin from '../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { Loading } from "../../elements/Loading";
import { Col, Row, Container, Form } from "react-bootstrap";
import VistaPreviaImagen from "./VistaPreviaImagen";
import defaultEventos from '../../assets/defaultimages/defaultEvento.png'
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
    },[]);

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

    return (
        <div>
            {isLoading? <Loading/> :
            <Container>
                <Row className='my-5'>
                    <Container className='m-0 p-0'>
                        <h2 className='text-center'>{id?'Editar':'Agregar'} Evento</h2>
                    </Container>
                </Row>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs={5}>
                                <Container>
                                    <VistaPreviaImagen item={item} setValue={setValue} modoEdicion={modoEdicion} defaultImg={defaultEventos}/>
                                </Container>        
                            </Col>
                            <Col xs={7}>
                                <Container>
                                    <div className='px-3 mx-2'>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Título de evento</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Título de evento' {...register("titulo")} required />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Organizador</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Organizador' {...register("organizador")} required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Lugar</Form.Label>
                                                    <input type="text" className='form-control' placeholder='Lugar' {...register("lugar")} required />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Fecha</Form.Label>
                                                    <input  type="date" className='form-control' {...register("fecha")} required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
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
                                <Form.Label>Descripción</Form.Label>
                                <textarea className='form-control' rows="5" type="text" placeholder="Descripción"  {...register("descripcion")} required/>
                            </Form.Group>
                        </Row>
                        <Row className='px-5 mt-3 mb-5'>
                            <Col>
                                <Form.Check type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")}/>
                            </Col>
                            <Col>              
                                <Row className='justify-content-around align-items-end'>
                                    <Col>
                                        <div className='button-nav btn btn-secondary btn-lg' onClick={() => navigate('/eventos')}>Regresar</div>
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
const ConnectedEditarEvento = connect(mapStateToProps, mapDispatchToProps)(EditarEvento);
export default ConnectedEditarEvento 
