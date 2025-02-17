// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types';
import { useCategoriasMenu, useCategoriasGrid } from '../../hooks/useCategorias';
import { useEffect } from 'react';
import { FilterSection } from './Filters';
import { GridContainer } from './Grid';
import { Loading } from '../generalSections/Loading';
import { ButtonNav } from '../../elements/Buttons';
import { ProximoSeminario } from '../../pages/categories/protected/ProxSeminario';
/**
 * 
 * @param {string, bool} 
 * categoria: El PageLayout envía la categoria en la que se encuentra obtenida del url
 * loginState: estado para sabe si se está logeado o no y desplejar algunos botones. 
 * @returns Regresará una el contenido de las categorias compuesto por un boton para agregar contenido (en caso que se este logeado),
 * un apartado de filtros para realizar busquedas y un grid con el contenido de cada sección, utiliza los customhooks que estan en useCategorias 
 * para obtener el contenido de acuerdo a cada categoria
 */
export default function CategoriasBody({ categoria, loginState }) {
    const { arrMenu, loadingMenu,
        getMenuData, filtrarPorKey,
        filtrarPorLabel, mostrarArea,
        arrOrdenarPor } = useCategoriasMenu(categoria);

    const { arrGrid, getGridData, loadingArrGrid,
        pathItem, updateSorted, getFilteredGridData,
        header, deleteItem, proxSeminario,
        loadingProxSeminario, getProxSeminario } = useCategoriasGrid(categoria);
        
    console.log("pathItem: "+pathItem);
    console.log("header: "+ header);
    console.log("arrMenu: "+arrMenu);

    useEffect(() => {
        getProxSeminario();
        getMenuData();
        getGridData();
      
        const interval = setInterval(() => {
          getProxSeminario();
          getMenuData();
          getGridData();
        }, 3 * 60 * 1000); // Cada 3 minutos
      
        return () => clearInterval(interval);
      }, [categoria, getGridData, getMenuData, getProxSeminario]);

    return (
        <section id='categorias-content'>
            {loginState &&
                <div id='agregar-item' className='flex justify-center my-4'>
                    <ButtonNav 
                        label={`Agregar ${header}`} 
                        path={`/agregar${pathItem}`} />
                </div>}
            {proxSeminario &&
                <ProximoSeminario proxSeminario={proxSeminario}
                    loadingProxSeminario={loadingProxSeminario} />}
            {Array.isArray(arrMenu) &&
                <FilterSection
                    loadingMenu={loadingMenu}
                    arrMenu={arrMenu}
                    filtrarPorKey={filtrarPorKey}
                    filtrarPorLabel={filtrarPorLabel}
                    cambiarOrden={updateSorted}
                    mostrarArea={mostrarArea}
                    arrOrdenarPor={arrOrdenarPor}
                    getFiltered={getFilteredGridData}
                />
            }
            {loadingArrGrid ? <Loading /> :
                <GridContainer
                    arrGrid={arrGrid}
                    pathItem={pathItem}
                    isLoggedIn={loginState}
                    deleteItem={deleteItem}
                />
            }
        </section>
    )
}

CategoriasBody.propTypes = {
    categoria:PropTypes.string.isRequired,
    loginState: PropTypes.bool.isRequired
}