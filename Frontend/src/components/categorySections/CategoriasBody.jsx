// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types';

import { useCategoriasMenu, useCategoriasGrid } from '../../hooks/useCategorias';
import { useEffect } from 'react';


import { FilterSection } from '../../components/categorySections/Filters';
import { GridContainer } from '../../components/categorySections/Grid';
import { Loading } from '../../elements/Loading';
import { ButtonNav } from '../../elements/Buttons';
import { ProximoSeminario } from '../../components/categorySections/Seminarios/ProxSeminario';
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

    // console.log("categoria: "+categoria)
    // console.log("loginState: "+loginState)

    const { arrMenu, loadingMenu,
        getMenuData, filtrarPorKey,
        filtrarPorLabel, mostrarArea,
        arrOrdenarPor } = useCategoriasMenu(categoria);

    const { arrGrid, getGridData, loadingArrGrid,
        pathItem, updateSorted, getFilteredGridData,
        header, deleteItem, proxSeminario,
        loadingProxSeminario, getProxSeminario } = useCategoriasGrid(categoria);

    // console.log("pathItem: "+pathItem);

    useEffect(() => {
        getProxSeminario();
        getMenuData();
        getGridData();
    }, [categoria, getGridData, getMenuData, getProxSeminario])

    return (
        <section id='categorias-content'>
            {loginState &&
                <div id='agregar-item' className='my-4'>
                    <ButtonNav label={`Agregar ${header}`} path={`/agregar${pathItem}`} />
                </div>}
            {proxSeminario &&
                <ProximoSeminario proxSeminario={proxSeminario}
                    loadingProxSeminario={loadingProxSeminario} />}
            {arrMenu &&
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