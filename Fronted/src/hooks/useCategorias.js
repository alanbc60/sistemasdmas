import { useCallback, useEffect, useMemo, useState } from "react"
import defaultImgSeminarios from '../assets/defaultimages/defaultSeminario.png';
import defaultImgInvestigacion from '../assets/defaultimages/defaultInvestigacion.png';
import defaultImgPublicacion from '../assets/defaultimages/defaultPublicacion.png';
import defaultImgEvento from '../assets/defaultimages/defaultEvento.png';
import defaultImgTerminal from '../assets/defaultimages/defaultTerminal.png';
import {host} from '../data/host';
import axios from 'axios';
import Swal from 'sweetalert2';
import filterType from '../data/dropdownType.json';
import filterDate from '../data/dropdownDateProyectosInvestigacion.json';
import filterDate2 from '../data/dropdownDateSeminarios.json';
import defaultSeminarios from '../assets/defaultimages/defaultSeminario.png';
import defaultInvestigacion from '../assets/defaultimages/defaultInvestigacion.png';
import defaultTerminal from '../assets/defaultimages/defaultTerminal.png';
import defaultPublicacion from '../assets/defaultimages/defaultPublicacion.png';
import defaultEvento from '../assets/defaultimages/defaultEvento.png';
import defaultDocumento from '../assets/defaultimages/defaultDocumento.png'

export const useVerItem = (categoria, item)=>{

    const [data, setData] = useState(null);
    const [loadingVer, setLoadingVer] = useState(false);
    
    const buildURL = useMemo(()=>{
        if (categoria === 'seminarios') {
            return host+`:3001/get/seminarios/seminario-item`;
        } else if (categoria === 'lineamientosproc') {
            return host+`:3001/get/lineamientosproc/lineamientoproc-item`
        } else if (categoria === 'proyectosinvestigacion') {
            return host+`:3001/get/proyectosinvestigacion/proyectoinvestigacion-item`;   
        } else if (categoria === 'proyectosterminales'){
            return host+`:3001/get/proyectosterminales/proyectoterminal-item`
        } else if (categoria === 'publicaciones'){
            return host+`:3001/get/publicaciones/publicacion-item`
        } else if (categoria === 'eventos'){
            return host+`:3001/get/eventos/evento-item`
        }
    }, [categoria])

    const getData = useCallback( async ()=>{
        try {
        setLoadingVer(true)
        const response = await axios.get(buildURL,{params:{id: item}});
        const result = response.data;
        let mappedResults;
        if (categoria === 'seminarios') {
            mappedResults = { 
                titulo: result.titulo,
                archivo: result.imagen?result.imagen:defaultImgSeminarios,
                responsables: result.expositor,
                participantes: null,
                youtube: result.youtube,
                fecha: result.fecha,
                area: result.area,
                parrafo1: result.resumen,
                parrafo2: result.semblanza,
                enlace: null,
                fechaActualizacion: null,
                tipo:null
            }
        } else if (categoria === 'lineamientosproc') {
            mappedResults = { 
                titulo: result.titulo,
                archivo: result.imagen?result.imagen:defaultDocumento,
                responsables: null,
                participantes: null,
                youtube: null,
                fecha: null,
                area: null,
                parrafo1: result.descripcion,
                parrafo2: null,
                enlace: result.documento,
                fechaActualizacion: null,
                tipo:null
            }
        } else if (categoria === 'proyectosinvestigacion') {
            mappedResults = { 
                titulo: result.titulo,
                archivo: result.imagen?result.imagen:defaultImgInvestigacion,
                responsables: result.responsable,
                participantes: result.participantes,
                youtube: null,
                fecha: result.fechainicio,
                area: result.area,
                parrafo1: result.objetivo,
                parrafo2: null,
                enlace: result.enlace,
                fechaActualizacion: result.fechaactualizacion,
                tipo: null
            }
        } else if (categoria === 'proyectosterminales') {
            mappedResults = { 
                titulo: result.titulo,
                archivo: result.imagen?result.imagen:defaultImgTerminal,
                responsables: result.asesores,
                participantes: result.autores,
                youtube: result.youtube,
                fecha: result.fechapublicacion,
                area: result.area,
                parrafo1: result.objetivo,
                parrafo2: result.tesina,
                enlace: null,
                fechaActualizacion: null,
                tipo:null
            }
        } else if (categoria === 'publicaciones') {
            mappedResults = { 
                titulo: result.titulo,
                archivo: result.imagen?result.imagen:defaultImgPublicacion,
                responsables: result.autor,
                participantes: null,
                youtube: null,
                fecha: result.anio, 
                area: result.area,
                parrafo1: result.resumen,
                parrafo2: null,
                enlace: result.enlace,
                fechaActualizacion: null,
                tipo: result.tipo
            }
        } else if (categoria === 'eventos') {
            mappedResults = { 
                titulo: result.titulo,
                archivo: result.imagen?result.imagen:defaultImgEvento,
                responsables: result.organizador,
                participantes: null,
                youtube: null,
                fecha: result.fecha,
                area: result.area,
                parrafo1: result.descripcion,
                parrafo2: result.lugar,
                enlace: null,
                fechaActualizacion: null,
                tipo:null
            }
        }
        setData(mappedResults); 
        } catch (error) {
            Swal.fire({
                    icon: 'error',
                    iconColor:'#F05757',
                    backdrop: 'rgba(255,157,5,0.2)',    
                    title: 'Oops...',
                    showConfirmButton: false,
                    timer: '2500',
                    text: 'Parece que hubo un problema',
                    footer: error.message === 'Network Error'? 'Intente más tarde': 
                            error.message === 'Request failed with status code 404'? 'No se encontró ningún elemento':error.message
                    })
        } finally{
            setLoadingVer(false)
        }
    },[]);
    
    useEffect(()=>{
        getData();
    },[getData])

    return { data, loadingVer };
}

export const useCategoriasMenu = (categoria)=>{
    const [arrMenu, setArrMenu] = useState(null);
    const [loadingMenu, setMenuLoading]=useState(false)
    const [filtrarPorKey, setFiltrarPorKey] = useState('')
    const [filtrarPorLabel, setFiltrarPorLabel] = useState('')
    const [mostrarArea, setMostrarArea]= useState(false)
    const [arrOrdenarPor, setArrOrdenarPor]= useState(null)
    
    const getMenuData = useCallback(async()=>{
        if (categoria === 'seminarios') {
            console.log("entro a seminarios");
            console.log(host+`:3001/get/seminarios/expositores`);
            try {
                setMenuLoading(true);     
                const response = await axios.get(host+`:3001/get/seminarios/expositores`);
                const result = response.data
                setArrMenu(result)
                setFiltrarPorKey('expositor')
                setFiltrarPorLabel('Expositor/a')
                setMostrarArea(true)
                setArrOrdenarPor(filterDate2)    
            } catch (error) {
                console.log('Error al obtener expositores: '+error.message)
            }finally{
                setMenuLoading(false)
            }
        } else if (categoria === 'proyectosinvestigacion') {
            try {
                setMenuLoading(true);
                const response = await axios.get(host+`:3001/get/proyectosinvestigacion/profesores`);
                const result = response.data
                setArrMenu(result)
                setFiltrarPorKey('responsable')
                setFiltrarPorLabel('Responsable')
                setMostrarArea(false)
                setArrOrdenarPor(filterDate)
            } catch (error) {
                console.log('Error al obtener profesores: '+error.message)
            }finally{
                setMenuLoading(false)
            }  
        } else if (categoria === 'proyectosterminales'){
            try {
                setMenuLoading(true);
                const response = await axios.get(host+`:3001/get/proyectosterminales/asesores`);
                const result = response.data
                setArrMenu(result)
                setFiltrarPorKey('asesores')
                setFiltrarPorLabel('Asesores')
                setMostrarArea(true)
                setArrOrdenarPor(filterDate)
            } catch (error) {
                console.log('Error al obtener asesores: '+error.message)
            }finally{
                setMenuLoading(false)
            }
        } else if (categoria === 'publicaciones'){
            setArrMenu(filterType)
            setMenuLoading(false)
            setFiltrarPorKey('filtro')
            setFiltrarPorLabel('Tipo')
            setMostrarArea(false)
            setArrOrdenarPor(filterDate)
        } else if (categoria === 'eventos'){
            try {
                setMenuLoading(true);
                const response = await axios.get(host+`:3001/get/eventos/organizadores`);
                const result = response.data
                setArrMenu(result)
                setFiltrarPorKey('organizador')
                setFiltrarPorLabel('Organizador/a')
                setMostrarArea(true)
                setArrOrdenarPor(filterDate)
            } catch (error) {
                console.log('Error al obtener organizadores: '+error.message)
            }finally{
                setMenuLoading(false)
            } 
        } else if (categoria === 'lineamientosproc'){
            setArrMenu(null)
            setMenuLoading(false)
            setFiltrarPorKey('')
            setFiltrarPorLabel('')
            setMostrarArea(false)
            setArrOrdenarPor([])
        }
    },[categoria])

    return {arrMenu, loadingMenu, getMenuData, filtrarPorKey, filtrarPorLabel, mostrarArea, arrOrdenarPor}
}

export const useCateriasGrid = (categoria)=>{
    const [arrGrid, setArrGrid] = useState(null);
    const [loadingArrGrid, setLoadingArrGrid]=useState(false)
    const [sorted, setSorted] = useState(1);
    const [proxSeminario, setProxSeminario] = useState([]);
    const [loadingProxSeminario, setLoadingProxSeminario] = useState(false);

    const getGridData = useCallback(async()=>{
        if (categoria === 'seminarios') {
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/seminarios/`);
                const result = response.data
                const mappedResults = result.map((e)=>({
                    id: e.idseminario, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultSeminarios,
                    responsable: e.expositor,
                    fecha: e.fecha,
                    area: e.area,
                }))
                setArrGrid(mappedResults);
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'proyectosinvestigacion') {
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/proyectosinvestigacion/`);
                const result = response.data
                const mappedResults = result.map((e)=>({
                    id: e.idproyecto, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultInvestigacion,
                    responsable: e.responsable,
                    fecha: e.fechaactualizacion,
                    area: e.area,
                }))
                setArrGrid(mappedResults)
                
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }  
        } else if (categoria === 'proyectosterminales'){
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/proyectosterminales/`);
                const result = response.data;
                const mappedResults = result.map((e)=>({
                    id: e.idproyecto, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultTerminal,
                    responsable: e.asesores,
                    fecha: e.fechapublicacion,
                    area: e.area,
                }))
                setArrGrid(mappedResults)
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'publicaciones'){
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/publicaciones/`);
                const result = response.data
                const mappedResults = result.map((e)=>(
                    {
                        id: e.idpublicacion,
                        titulo: e.titulo,
                        imagen: e.imagen?e.imagen:defaultPublicacion,
                        responsable: e.autor,
                        fecha: e.anio,
                        area: e.area
                    }
                ))
                setArrGrid(mappedResults)
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'eventos'){
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/eventos/`);
                const result = response.data;
                const mappedResults = result.map((e)=>({
                    id: e.idevento, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultEvento,
                    responsable: e.organizador,
                    fecha: e.fecha,
                    area: e.area,
                }))
                setArrGrid(mappedResults);
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'lineamientosproc'){
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/lineamientosproc/`)
                const result = response.data;
                const mappedResults = result.map((e)=>(
                    {
                        id: e.idprocedimiento,
                        titulo: e.titulo,
                        imagen: e.imagen?e.imagen:defaultDocumento,
                        responsable: e.descripcion,
                        fecha: null,
                        area: null
                    }
                ))
                setArrGrid(mappedResults)
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        }
    },[categoria])

    const getFilteredGridData = useCallback(async(busqueda, filtrarPor, filtrarArea)=>{
        if (categoria === 'seminarios') {
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/seminarios/filtrar`,{
                    params:{  busqueda: busqueda,
                              expositor: filtrarPor==='Todos'?-1:filtrarPor,
                              area: filtrarArea},
                });
                const result = response.data;
                const mappedResults = result.map((e)=>({
                    id: e.idseminario, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultSeminarios,
                    responsable: e.expositor,
                    fecha: e.fecha,
                    area: e.area,
                }))
                setArrGrid(mappedResults)
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'proyectosinvestigacion') {
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/proyectosinvestigacion/filtrar`,{
                    params:{  busqueda: busqueda,
                              responsable: filtrarPor==='Todos'?-1:filtrarPor,
                              area: 0
                            },
                })
                const result = response.data;
                const mappedResults = result.map((e)=>({
                    id: e.idproyecto, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultInvestigacion,
                    responsable: e.responsable,
                    fecha: e.fechaactualizacion,
                    area: e.area,
                }))
                setArrGrid(mappedResults);
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            } 
        } else if (categoria === 'proyectosterminales'){
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/proyectosterminales/filtrar`,{
                    params:{  busqueda: busqueda,
                              asesores: filtrarPor==='Todos'?-1:filtrarPor,
                              area: filtrarArea},
                    
                    });
                const result = response.data
                const mappedResults = result.map((e)=>({
                    id: e.idproyecto, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultTerminal,
                    responsable: e.asesores,
                    fecha: e.fechapublicacion,
                    area: e.area,
                }))
                setArrGrid(mappedResults);
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'publicaciones'){
            const typeValue = filterType.find((e)=>e.filtro===filtrarPor)
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/publicaciones/filtrar`,{
                    params:{  busqueda: busqueda,
                            autor: -1,
                            area: 0,
                            tipo: filtrarPor==='Todos'?0:typeValue.type
                        },
                })
                const result = response.data
                const mappedResults = result.map((e)=>(
                    {
                        id: e.idpublicacion,
                        titulo: e.titulo,
                        imagen: e.imagen?e.imagen:defaultPublicacion,
                        responsable: e.autor,
                        fecha: e.anio,
                        area: e.area
                    }
                ))
                setArrGrid(mappedResults);
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        } else if (categoria === 'eventos'){
            try {
                setLoadingArrGrid(true);
                const response = await axios.get(host+`:3001/get/eventos/filtrar`,{
                    params:{  busqueda: busqueda,
                              organizador: filtrarPor==='Todos'?-1:filtrarPor,
                              area: filtrarArea
                    }
                })
                const result = response.data;
                const mappedResults = result.map((e)=>({
                    id: e.idevento, 
                    titulo: e.titulo,
                    imagen: e.imagen?e.imagen:defaultEvento,
                    responsable: e.organizador,
                    fecha: e.fecha,
                    area: e.area,
                }))
                setArrGrid(mappedResults);
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoadingArrGrid(false)
            }
        }
    },[categoria])

    const updateSorted = (e)=>{
        const newValue = e.value
        setSorted(newValue)
    }

    const getSortedGrid = useMemo(()=>{
        if(arrGrid)
        return sorted ===1 ? arrGrid.sort((a,b)=>{
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return fechaB - fechaA;
          })
          : arrGrid.sort((a,b)=>{
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return fechaA - fechaB;
          })
    },[sorted, arrGrid])

    const header = useMemo(()=>{
        if (categoria === 'seminarios') {
            return  'Seminario'
        } else if (categoria === 'proyectosinvestigacion') {
            return  'Proyecto de Investigación'
        } else if (categoria === 'proyectosterminales'){
            return  'Proyecto Terminal'
        } else if (categoria === 'publicaciones'){
            return 'Publicación'
        } else if (categoria === 'eventos'){
            return 'Evento'
        } else if (categoria === 'lineamientosproc'){
            return  'Documento'
        } 
    },[categoria])

    const pathItem = useMemo(()=>{
        if (categoria === 'seminarios') {
            return  '/seminarios/'
        } else if (categoria === 'proyectosinvestigacion') {
            return  '/proyectosinvestigacion/'
        } else if (categoria === 'proyectosterminales'){
            return  '/proyectosterminales/'
        } else if (categoria === 'publicaciones'){
            return '/publicaciones/'
        } else if (categoria === 'eventos'){
            return '/eventos/'
        } else if (categoria === 'lineamientosproc'){
            return'/lineamientosproc/'
        } 
    },[categoria])

    const deleteItem = useCallback(async(item)=>{
        const {titulo, id, responsable} = item;
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar <i>${categoria==='publicaciones'?'esta':'este'} ${header.toLowerCase()}</i>?`,
            html: `<strong>${titulo}</strong> <p>${categoria==='lineamientosproc'?'':'de '}<i>${responsable}</i></p>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar '+header,
            cancelButtonText: 'Cancelar',
            iconColor:'#F05757',
            confirmButtonColor: '#00C3DB',
            cancelButtonColor: '#F05757',
            backdrop: 'rgba(255,157,5,0.2)'
        }).then((result)=>{
            if(result.isConfirmed){
                if (categoria === 'seminarios') {
                    axios.delete(host+':3001/delete/seminarios/item',{data:{id: id}}).then(()=>{
                        Swal.fire({
                            title:'¡Seminario Eliminado Exitosamente!',
                            html: 'El seminario <strong>'+titulo+'</strong> ha sido eliminado correctamente.',
                            icon:'success',
                            showConfirmButton: false,
                            backdrop: 'rgba(255,157,5,0.2)',
                            timer: '2500'
                        })
                        getGridData()
                        getProxSeminario()
                    }).catch((error)=>{
                        Swal.fire({
                            icon: 'error',
                            iconColor:'#F05757',
                            backdrop: 'rgba(255,157,5,0.2)',
                            title: 'Oops...',
                            html: 'Hubo un problema al eliminar <strong>'+titulo+'</strong>',
                            showConfirmButton: false,
                            timer: '2500',
                            footer: error.message === 'Network Error'? 'Intente más tarde': 
                                    error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                    :error.message
                        })
                    })
                } else if (categoria === 'proyectosinvestigacion') {
                    axios.delete(host+':3001/delete/proyectosinvestigacion/item',{data:{id: id}}).then(()=>{
                        Swal.fire({
                            title:'¡Proyecto Eliminado Exitosamente!',
                            html: 'El proyecto <strong>'+titulo+'</strong> ha sido eliminado correctamente.',
                            icon:'success',
                            showConfirmButton: false,
                            backdrop: 'rgba(255,157,5,0.2)',
                            timer: '2500'
                        })
                        getGridData()
                    }).catch((error)=>{
                        Swal.fire({
                            icon: 'error',
                            iconColor:'#F05757',
                            backdrop: 'rgba(255,157,5,0.2)',
                            title: 'Oops...',
                            html: 'Hubo un problema al eliminar <strong>'+titulo+'</strong>',
                            showConfirmButton: false,
                            timer: '2500',
                            footer: error.message === 'Network Error'? 'Intente más tarde': 
                                    error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                    :error.message
                        })
                    })
                } else if (categoria === 'proyectosterminales'){
                    axios.delete(host+':3001/delete/proyectosterminales/item',{data:{id: id}}).then(()=>{
                        Swal.fire({
                            title:'¡Proyecto Eliminado Exitosamente!',
                            html: 'El proyecto <strong>'+titulo+'</strong> ha sido eliminado correctamente.',
                            icon:'success',
                            showConfirmButton: false,
                            backdrop: 'rgba(255,157,5,0.2)',
                            timer: '2500'
                        })
                        getGridData();
                    }).catch((error)=>{
                        Swal.fire({
                            icon: 'error',
                            iconColor:'#F05757',
                            backdrop: 'rgba(255,157,5,0.2)',
                            title: 'Oops...',
                            html: 'Hubo un problema al eliminar <strong>'+titulo+'</strong>',
                            showConfirmButton: false,
                            timer: '2500',
                            footer: error.message === 'Network Error'? 'Intente más tarde': 
                                    error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                    :error.message
                        })
                    })
                } else if (categoria === 'publicaciones'){
                    axios.delete(host+':3001/delete/publicaciones/item',{data:{id: id}}).then(()=>{
                        Swal.fire({
                            title:'¡Publicación Eliminada Exitosamente!',
                            html: 'La publicación <strong>'+titulo+'</strong> ha sido eliminada correctamente.',
                            icon:'success',
                            showConfirmButton: false,
                            backdrop: 'rgba(255,157,5,0.2)',
                            timer: '2500'
                        })
                        getGridData()
                    }).catch((error)=>{
                        Swal.fire({
                            icon: 'error',
                            iconColor:'#F05757',
                            backdrop: 'rgba(255,157,5,0.2)',
                            title: 'Oops...',
                            html: 'Hubo un problema al eliminar <strong>'+titulo+'</strong>',
                            showConfirmButton: false,
                            timer: '2500',
                            footer: error.message === 'Network Error'? 'Intente más tarde': 
                                    error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                    :error.message
                        })
                    })
                } else if (categoria === 'eventos'){
                    axios.delete(host+':3001/delete/eventos/item',{data:{id: id}}).then(()=>{
                        Swal.fire({
                            title:'¡Evento Eliminado Exitosamente!',
                            html: 'El evento <strong>'+titulo+'</strong> ha sido eliminado correctamente.',
                            icon:'success',
                            showConfirmButton: false,
                            backdrop: 'rgba(255,157,5,0.2)',
                            timer: '2500'
                        })
                        getGridData()
                    }).catch((error)=>{
                        Swal.fire({
                            icon: 'error',
                            iconColor:'#F05757',
                            backdrop: 'rgba(255,157,5,0.2)',
                            title: 'Oops...',
                            html: 'Hubo un problema al eliminar <strong>'+titulo+'</strong>',
                            showConfirmButton: false,
                            timer: '2500',
                            footer: error.message === 'Network Error'? 'Intente más tarde': 
                                    error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                    :error.message
                        })
                    })
                } else if (categoria === 'lineamientosproc'){
                    axios.delete(host+':3001/delete/lineamientosproc/item',{data:{id: id}}).then(()=>{
                        Swal.fire({
                            title:'¡Documento Eliminado Exitosamente!',
                            html: 'El documento <strong>'+titulo+'</strong> ha sido eliminado correctamente.',
                            icon:'success',
                            showConfirmButton: false,
                            backdrop: 'rgba(255,157,5,0.2)',
                            timer: '2500'
                        })
                        getGridData();
                    }).catch((error)=>{
                        Swal.fire({
                            icon: 'error',
                            iconColor:'#F05757',
                            backdrop: 'rgba(255,157,5,0.2)',
                            title: 'Oops...',
                            html: 'Hubo un problema al eliminar <strong>'+titulo+'</strong>',
                            showConfirmButton: false,
                            timer: '2500',
                            footer: error.message === 'Network Error'? 'Intente más tarde': 
                                    error.message === 'Request failed with status code 500'? 'Error interno del servidor (500)' 
                                    :error.message
                        })
                    })
                }
            }
        })
    },[categoria, header, getGridData])

    
    const getProxSeminario = useCallback( async()=>{
        if(categoria==='seminarios'){
            try {
                setLoadingProxSeminario(true);
                const response = await axios.get(host+`:3001/get/seminarios/mas-proximo`);
                const result = response.data
                const mappedResults = {
                    id: result.idseminario,
                    titulo: result.titulo,
                    imagen: result.imagen?result.imagen:defaultSeminarios,
                    responsable: result.expositor,
                    resumen: result.resumen,
                    semblanza: result.semblanza,
                    fecha: result.fecha,
                    youtube: result.youtube
                }
                setProxSeminario(mappedResults)
            } catch (error) {
                console.log('Error al obtener próximo seminario: '+error.message)
            }finally{
                setLoadingProxSeminario(false)
            }
        }else{
            setProxSeminario(null)
            setLoadingProxSeminario(false)
        }
    },[categoria])


    return {updateSorted, arrGrid: getSortedGrid, getGridData, 
        loadingArrGrid, pathItem, getFilteredGridData, 
        header, deleteItem, proxSeminario, loadingProxSeminario, getProxSeminario}
}
