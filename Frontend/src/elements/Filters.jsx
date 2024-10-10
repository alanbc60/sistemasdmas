import Select from 'react-select';
import filterSubject from '../data/dropdownSubject.json'
import { Container, Form, Row } from 'react-bootstrap';
import {ShortLoading} from './Loading';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { SubmitInput } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/**
 * 
 * @param {bool, array, string, func, bool} 
 * loadingMenu: booleana para mostrar en lo que llega el contenido
 * arrMenu: arreglo para el contenido de un filtro
 * filtrarPorKey: key del arregloMenu por ejemplo: organizador, expositor, responsable, etc
 * filtrarPorLabel: label para poner arriba del menu por ejemplo: Expositor/a, Organizador/a, Responsable, etc
 * cambiarOrden: Función que ordena el contenido de la categoría
 * mostrarArea: booleana que dependiendo de la categoría muestra o no el filtro área
 * arrOrdenarPor: arreglo para el contenido del filtro Ordenar
 * getFiltered: funcion que recibe la infomración de los filtros, hace una petición al servidor y dependiendo de la categoría muestra el contenido filtrado 
 * @returns 
 */
export const FilterSection = ({
    loadingMenu, arrMenu, filtrarPorKey, 
    filtrarPorLabel, cambiarOrden, 
    mostrarArea, arrOrdenarPor,getFiltered})=>{
    
    const defaultFiltrarPor = {value:'Todos', label:'Todos'};
    const defaultArea = {value: filterSubject[0].type, label: filterSubject[0].filtro};
    const [busquedaInput, setBusquedaInput] = useState('');
    const [filtrarPor, setFiltrarPor] = useState(defaultFiltrarPor);
    const [areaValue, setAreaValue] = useState(defaultArea);
    const optionsOrder = arrOrdenarPor.map(e=>({value:e.id, label:e.filtro}))
    const [orderValue, setOrderValue] = useState(optionsOrder[0])
    const previousBusqueda = useRef(null);
    const previousFiltrarPor = useRef(null);
    const previousArea = useRef(null);

    const onChangeBusqueda = (e)=>{
      const newValue =e.target.value
      setBusquedaInput(newValue)
    }

    const onChangeFiltrarPor = (e)=>{
      const newValue =e
      setFiltrarPor(newValue)
    }

    const onChangeAreaValue = (e)=>{
      const newValue = e
      setAreaValue(newValue)
    }

    const onChangeOrderValue = (e)=>{
      const newValue = e
      cambiarOrden(newValue);
      setOrderValue(newValue)
    }

    const optionsFilter = arrMenu.map(e=>(
        {value: e[filtrarPorKey]
            , label:e[filtrarPorKey]}
    ))
  
    const optionsFilterSelect = [{value:'Todos', label:'Todos'},...optionsFilter]
    
    const optionsArea = filterSubject.map(e=>({value:e.type, label:e.filtro}))

    
    const handleSumbit = (e)=>{
      e.preventDefault();
      
      const {busqueda, filtrarPor, filtrarArea} = Object.fromEntries(
        new window.FormData(e.target)
      )
      if ((busqueda===previousBusqueda.current && 
        filtrarPor === previousFiltrarPor.current && 
        filtrarArea === previousArea.current)) return 
      previousBusqueda.current = busqueda
      previousFiltrarPor.current = filtrarPor
      previousArea.current = filtrarArea
      getFiltered(busqueda, filtrarPor, filtrarArea)
      setBusquedaInput('')
      setFiltrarPor(defaultFiltrarPor)
      setAreaValue(defaultArea)
    }

    useEffect(()=>{
      setFiltrarPor(defaultFiltrarPor);
      setAreaValue(defaultArea);
      setBusquedaInput('')
      setOrderValue(optionsOrder[0])
      cambiarOrden({value:1})
    },[arrMenu])
    return(
      <Container className='mb-5 vw-100'>
        <Form onSubmit={handleSumbit} className='form m-auto'>
          <Container>
          <Row id='filtros-inputs'>
            <Form.Group controlid='search' className='label-input'>
            <label htmlFor='busqueda'>Búsqueda</label>
              <input name='busqueda' id='busqueda' type='text' className='form-control' placeholder='Palabras clave' onChange={onChangeBusqueda} value={busquedaInput}/>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" id='seach-icon' />
            </Form.Group>
            {loadingMenu?<ShortLoading/>:
            <Form.Group controlid='typpeFilter' className='label-input'>
            <label id='filtrarPor-label' className='form-label' htmlFor='filtrarPor'>
              {filtrarPorLabel}
            </label>
                {arrMenu.length>0?
                  <Select className='filtro-container'
                classNamePrefix='filtro' aria-labelledby='filtrarPor-label' inputId='filtrarPor' name='filtrarPor'
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: 'var(--uam-color-light)',
                    primary: 'var(--uam-color)',
                    primary50: 'var(--uam-color-mid)'
                  },
                })} options={optionsFilterSelect} 
                    defaultValue={defaultFiltrarPor} 
                    onChange={onChangeFiltrarPor}
                    value={filtrarPor}/>:
                <div>No hay {filtrarPorLabel}</div>
                }
            </Form.Group>
            }
            {mostrarArea&&
            <Form.Group controlid='area' className='label-input'>
            <label id='filtrarArea-label' className='form-label' htmlFor='filtrarArea'>
              Área</label>
              <Select aria-labelledby='filtrarArea-label' className='filtro-container'
              classNamePrefix='filtro' 
              inputId='filtrarArea'
              name='filtrarArea'
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: 'var(--uam-color-light)',
                    primary: 'var(--uam-color)',
                    primary50: 'var(--uam-color-mid)'
                  },
                })} options={optionsArea} 
                defaultValue={defaultArea}
                onChange={onChangeAreaValue}
                value={areaValue}/>
            </Form.Group>}
          </Row>
          <div id='filtros-submit'>
            <SubmitInput value='Buscar'/>
          </div>
          <div id='filtros-ordenar'>
              <label id='filtro-ordenar-label' htmlFor='filtro-ordenar'>Ordenar</label>
              <Select aria-labelledby='filtro-ordenar-label' className='filtro-container'
              classNamePrefix='filtro' inputId='filtro-ordenar' name='filtro-ordenar'
              onChange={onChangeOrderValue}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: 'var(--uam-color-light)',
                    primary: 'var(--uam-color)',
                    primary50: 'var(--uam-color-mid)'
                  },
                })} options={optionsOrder} 
                defaultValue={optionsOrder[0]}
                value={orderValue} 
                textFieldProps={{
                  label: 'Label',
                  InputLabelProps: {
                      shrink: true
                  }
              }}/>
          </div>
          </Container>
        </Form>
      </Container>
    )
  }
  
FilterSection.propTypes = {
    loadingMenu:PropTypes.bool.isRequired,
    arrMenu: PropTypes.array.isRequired,
    filtrarPorKey: PropTypes.string.isRequired,
    filtrarPorLabel: PropTypes.string.isRequired,
    cambiarOrden: PropTypes.func.isRequired,
    mostrarArea: PropTypes.bool.isRequired,
    arrOrdenarPor: PropTypes.array.isRequired,
    getFiltered: PropTypes.func.isRequired
}