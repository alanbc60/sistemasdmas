import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import axios from 'axios';
import {host} from '../../../data/host';
import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { Loading } from "../../../elements/Loading";
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
    let modoEdicion = id ? true:false;
    
    const { register,reset, setValue, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return item;
          }, [item])
    });
    
    useEffect(()=>{
        register( "imagen" );
        register( "imgchanged", false );
        const getPublicacionItem = async () => {
            setLoading(true);
            try{
                await axios.get(host+`:3001/get/publicaciones/publicacion-edit`,{
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
            getPublicacionItem(); 
        }
    },[])

    const onSubmit = data => {
        const uploadData = generarFormData(data);
        verInformacionFormulario(uploadData);
        let headers = {
            'Content-Type':'multipart/form-data'
        };
        if(modoEdicion){
            const postEditPublicacion = ()=>{
                if(data.imgchanged){
                    const editarSiCambiaImagen = ()=>{
                        setLoading(true)
                        axios.post(host+`:3001/post/publicaciones/edit/image`,uploadData,{ headers }).then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Publicación Actualizada Exitosamente!',
                                    html: 'La publicación <strong>'+data.titulo+'</strong> ha sido actualizada correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(()=>{
                                    navigate("/ver/publicaciones/"+res.data)
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar la publicación con imagen, intenta de nuevo.',
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
                        axios.post(host+`:3001/post/publicaciones/edit`,{
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
                        }).then((res)=>{
                            if(res.data!==false){
                                Swal.fire({
                                    title:'¡Publicación Actualizada Exitosamente!',
                                    html: 'La publicación <strong>'+data.titulo+'</strong> ha sido actualizada correctamente.',
                                    icon:'success',
                                    showConfirmButton: false,
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    timer: '2500'
                                }).then(()=>{
                                    navigate("/ver/publicaciones/"+res.data)
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    iconColor:'#F05757',
                                    backdrop: 'rgba(255,157,5,0.2)',
                                    title: 'Oops...',
                                    text: 'Ocurrió un problema al editar la publicación sin imagen, intenta de nuevo.',
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
                title: '¿Estás seguro de que deseas actualizar esta publicación?',
                html: '<strong>'+data.titulo+'</strong> <p>de <i>'+data.autor+'</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Actualizar publicación',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    postEditPublicacion();
                }
            })
        }else{
            const postNewPublicacion = ()=>{
                const agregarPublicacion = ()=>{
                    setLoading(true)
                    axios.post(host+`:3001/post/publicaciones`,uploadData,{ headers }).then((res)=>{
                        if(res!==false){
                            Swal.fire({
                                title:'¡Publicación Agregada Exitosamente!',
                                html: 'La publicación <strong>'+data.titulo+'</strong> ha sido agregada correctamente.',
                                icon:'success',
                                showConfirmButton: false,
                                backdrop: 'rgba(255,157,5,0.2)',
                                timer: '2500'
                            }).then(()=>{
                                navigate("/ver/publicaciones/"+res.data)
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                iconColor:'#F05757',
                                backdrop: 'rgba(255,157,5,0.2)',
                                title: 'Oops...',
                                text: 'Ocurrió un problema al subir la publicación, intenta de nuevo.',
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
                agregarPublicacion();
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas agregar esta publicación?',
                html: '<strong>'+data.titulo+'</strong> <p>de <i>'+data.autor+'</i></p>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar publicación',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    postNewPublicacion();
                }    
            })
        }
    
        
    }
    useEffect(() => {
        reset(item);
    }, [item]);

    const generarFormData = (data) =>{
        const uploadData = new FormData();
        if(modoEdicion) uploadData.append('id',id);
        uploadData.append('imagen',data.imagen);
        uploadData.append('titulo',data.titulo);
        uploadData.append('autor',data.autor);
        uploadData.append('anio',data.anio);
        uploadData.append('resumen',data.resumen);
        uploadData.append('tipo',data.tipo);
        uploadData.append('area',0);
        uploadData.append('enlace',data.enlace);
        uploadData.append('publicarFacebook',data.publicarFacebook);
        uploadData.append('userId',props.usernameId.state);
        return uploadData;
    }
    const verInformacionFormulario = (data) =>{
        console.log("Formulario")
        console.log("Id: ",data.get('id'));
        console.log("Imagen: "+data.get('imagen')); 
        console.log("Titulo: "+data.get('titulo')); 
        console.log("Autor: "+data.get('autor')); 
        console.log("Año: "+data.get('anio')); 
        console.log("Resumen: "+data.get('resumen'));
        console.log("Tipo: "+data.get('tipo')); 
        console.log("Area: "+data.get('area')); 
        console.log("Enlace: "+data.get('enlace')); 
        console.log("PublicarFacebook: "+data.get('publicarFacebook')); 
    }

    return (
        <div>
            {isLoading? <Loading/>:
                <Container>
                    <Row className='my-5'>
                        <Container className='m-0 p-0'>
                            <h2 className='text-center'>{modoEdicion?'Editar':'Agregar'} Publicación</h2>
                        </Container>
                    </Row>
                    <Container>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col xs={5}>
                                    <Container>
                                        <VistaPreviaImagen item={item} setValue={setValue} modoEdicion={modoEdicion} defaultImg={defaultPublicacion}/>
                                    </Container>        
                                </Col>
                                <Col xs={7}>
                                    <Container>
                                        <div className='px-3 mx-2'>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Título de publicación</Form.Label>
                                                        <input type="text" className='form-control' placeholder='Título de publicación' {...register("titulo")} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Autor/a</Form.Label>
                                                        <input type="text" className='form-control' placeholder='Autor/a' {...register("autor")} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Año</Form.Label>
                                                        <input type="text" className='form-control' placeholder='Año' {...register("anio")} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Enlace (Opcional)</Form.Label>
                                                        <input type="text" className='form-control' placeholder='Enlace' {...register("enlace")}  />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group >
                                                        <Form.Label>Tipo</Form.Label>
                                                        <select className="form-select" {...register("tipo")} required>
                                                        {filterType
                                                            .filter((e) => !e.group)
                                                            .map((e) => (
                                                            <option key={e.id} value={e.type}>{e.filtro}</option>
                                                            ))
                                                            .slice(1)
                                                        }
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
                                    <Form.Label>Resumen</Form.Label>
                                    <textarea className='form-control' rows="5" type="text" placeholder="Resumen"  {...register("resumen")} required/>
                                </Form.Group>
                            </Row>
                            <Row className='px-5 mt-3 mb-5'>
                                <Col>
                                    <Form.Check type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")}/>
                                </Col>
                                <Col>              
                                    <Row className='justify-content-around align-items-end'>
                                        <Col>
                                            <div className='button-nav btn btn-secondary btn-lg' onClick={() => navigate('/publicaciones')}>Regresar</div>
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

const ConnectedEditarPublicacion = connect(mapStateToProps, mapDispatchToProps)(EditarPublicacion);
export default ConnectedEditarPublicacion;
