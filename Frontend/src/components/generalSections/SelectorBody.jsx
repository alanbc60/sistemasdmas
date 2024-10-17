import React from 'react'
import { useParams } from "react-router-dom"
import { connect } from 'react-redux';
import toggleLogin from '../../redux/actions/toggleLogin';

import AcercaDe from "../../pages/acercade/AcercaDe";
import JefesDelDMAS from "../../pages/jefesdeldmas/JefesDelDMAS";
import Sugerencias from "../../pages/sugerencias/Sugerencias";
import CategoriasBody from './CategoriasBody';
import QuienesSomos from '../../pages/quienesSomos';

/**
 * 
 * @param {*} props
 * logged.state estado global para sabe si se está logeado 
 * @returns dependiendo de la sección renderiza la compoennte necesaria.
 */
function SelectorBody(props) {
    const { section } = useParams();
    return (
        <>
            {section === 'acercade' ? <AcercaDe /> :
                section === 'jefesdeldmas' ? <JefesDelDMAS /> :
                    section === 'sugerencias' ? <Sugerencias /> :
                        section === 'quienessomos' ? <QuienesSomos/> :
                            // Categorias provenientes de useParams
                            <CategoriasBody categoria={section} loginState={props.logged.state} />
            }
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        logged: state.logged,
    };
};

const mapDispatchToProps = {
    toggleLogin,
};

const ConnectedSectionBody = connect(mapStateToProps, mapDispatchToProps)(SelectorBody);
export default ConnectedSectionBody;
