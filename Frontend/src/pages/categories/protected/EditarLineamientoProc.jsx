import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import axios from 'axios';
import {host} from '../../../data/host';
import toggleLogin from '../../../redux/actions/toggleLogin';
import { connect } from 'react-redux';
import { Loading } from "../../../elements/Loading";
import { Col, Row, Container, Form } from "react-bootstrap";
import defaultDocumento from '../../../assets/defaultimages/defaultDocumento.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import VistaPreviaImagen from "../protected/VistaPreviaImagen";

function EditarLineamientoProc(props) {
  
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
        const getLineamientoProcItem = async () => {
            setLoading(true);
            try{
                await axios.get(host+`:3001/get/lineamientosproc/lineamientoproc-item`,{
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
            getLineamientoProcItem(); 
        }
    },[])

    useEffect(() => {
        reset(item);
    }, [item]);

    const onSubmit = (data) => {
        const uploadData = generarFormData(data);
        verInformacionFormulario(uploadData);
        let headers = {
            'Content-Type':'multipart/form-data'
        };
        if(modoEdicion){
            const updateDocumento = ()=>{
                setLoading(true)
                axios.post(`${host}:3001/update/lineamientosproc/`, uploadData, {headers}).then((res)=>{
                    Swal.fire({
                        title:'¡Documento Actualizado Exitosamente!',
                        html: 'El documento <strong>'+data.titulo+'</strong> ha sido actualizado correctamente.',
                        icon:'success',
                        showConfirmButton: false,
                        backdrop: 'rgba(255,157,5,0.2)',
                        timer: '2500'
                    }).then(()=>{
                        setLoading(false)
                        navigate("/ver/lineamientosproc/"+res.data)
                    })
                })
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas actualizar este documento?',
                html: '<strong>'+data.titulo+'</strong>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Actualizar documento',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    updateDocumento();
                }
            })
        }else{
            const addDocumento =()=>{
                setLoading(true)
                axios.post(`${host}:3001/post/lineamientosproc/`, uploadData, {headers}).then((res)=>{
                    Swal.fire({
                        title:'¡Documento Agregado Exitosamente!',
                        html: 'El documento <strong>'+data.titulo+'</strong> ha sido agregado correctamente.',
                        icon:'success',
                        showConfirmButton: false,
                        backdrop: 'rgba(255,157,5,0.2)',
                        timer: '2500'
                    }).then(()=>{
                        setLoading(false)
                        navigate("/ver/lineamientosproc/"+res.data)
                    })
                })
            }
            Swal.fire({
                title: '¿Estás seguro de que deseas agregar este documento?',
                html: '<strong>'+data.titulo+'</strong>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar documento',
                cancelButtonText: 'Cancelar',
                iconColor:'#ECA869',
                confirmButtonColor: '#00C3DB',
                cancelButtonColor: '#F05757',
                backdrop: 'rgba(255,157,5,0.2)'
            }).then((result)=>{
                if(result.isConfirmed){
                    addDocumento();
                }
            })
        }
    }

    const generarFormData = (data) =>{
        const uploadData = new FormData();
        if(modoEdicion) uploadData.append('id',id);
        uploadData.append('titulo',data.titulo);
        uploadData.append('descripcion',data.descripcion);
        uploadData.append('imagen',data.imagen);
        uploadData.append('documento',data.documento);
        uploadData.append('publicarFacebook',data.publicarFacebook);
        uploadData.append('userId',props.usernameId.state);
        return uploadData;
    }

    const verInformacionFormulario = (data) =>{
        console.log("Formulario")
        console.log("Id: ",data.get('id'));
        console.log("Imagen: "+data.get('imagen')); 
        console.log("Titulo: "+data.get('titulo')); 
        console.log("Descripción: "+data.get('descripcion')); 
        console.log("Documento: "+data.get('documento')); 
        console.log("PublicarFacebook: "+data.get('publicarFacebook')); 
    }
                                   
    return (
        <div>
            { isLoading? <Loading/>:
                <Container>
                    <Row className='my-5'>
                        <Container className='m-0 p-0'>
                            <h2 className='text-center'>{modoEdicion?'Editar':'Agregar'} Documento</h2>
                        </Container>
                    </Row>
                    <Container>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col xs={6}>
                                    <Container>
                                    <VistaPreviaDocumento item={item} setValue={setValue} modoEdicion={modoEdicion}/>
                                    <VistaPreviaImagen item={item} setValue={setValue} modoEdicion={modoEdicion} defaultImg={defaultDocumento}/>
                                    </Container>        
                                </Col>
                                <Col xs={6}>
                                    <Container>
                                        <div className='px-3 mx-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Título de lineamiento y/o procedimiento</Form.Label>
                                                <input type="text" className='form-control' placeholder='Título de lineamiento y/o procedimiento' {...register("titulo")} required  />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Descripción</Form.Label>
                                                <textarea className='form-control' rows="3" type="text" placeholder="Descripción"  {...register("descripcion")} required/>
                                            </Form.Group>
                                        </div>
                                    </Container>
                                </Col>
                            </Row>
                            <Row className='px-5 mt-3 mb-5'>
                                <Col>
                                    <Form.Check type="checkbox" label="Publicar en el Facebook del departamento" {...register("publicarFacebook")}/>
                                </Col>
                                <Col>              
                                    <Row className='justify-content-around align-items-end'>
                                        <Col>
                                            <div className='button-nav btn btn-secondary btn-lg' onClick={() => navigate('/lineamientosproc')}>Regresar</div>
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

const VistaPreviaDocumento = (props) =>{

    let apiImage = props.item.documento;
    
    const previewImageStyle={objectFit: 'cover', height: 'auto', maxHeight:'100%'}
    const [imgFile, setImgFile] = useState(apiImage?apiImage: <FontAwesomeIcon icon="fa-regular fa-file-lines" id="svg_1" class="" fill="#f08200" fill-opacity="1"/>);

    const onImageChange = (e) =>{
        console.log(e.target.files[0]);
        if (e.target.files[0].size < 30e5){
            setImgFile(URL.createObjectURL(e.target.files[0]));
            props.setValue("documento", e.target.files[0])
        }else{
            Swal.fire({
                icon: 'info',
                iconColor:'#F05757',
                backdrop: 'rgba(255,157,5,0.2)',
                title: '¡Espera!',
                text: 'El tamaño del documento no puede exceder 3MB, intenta de nuevo.',
            })
            e.target.value="";
        }
    }

    return(
        <div className='px-3 my-4'>
            <p>Vista previa de documento</p>
            {imgFile===defaultDocumento?
            <img className='img-fluid w-100' style={previewImageStyle} src={defaultDocumento} alt='Vista previa de documento' />
            :<iframe title="Documento" src={imgFile} width="100%" height="250px" style={{border:"none"}}></iframe>
            }
            <br />
            <Col xs={10}>
                <input  type="file" className='form-control mt-4' onChange={onImageChange} />
                <div className="invalid-feedback">Example invalid form file feedback</div>
            </Col>
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

const ConnectedEditarLineamientoProc = connect(mapStateToProps, mapDispatchToProps)(EditarLineamientoProc);
export default ConnectedEditarLineamientoProc
