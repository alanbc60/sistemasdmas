import { useParams } from "react-router-dom"
import AcercaDe from "./acercade/AcercaDe";
import { connect } from 'react-redux';
import toggleLogin from '../../redux/actions/toggleLogin';
import JefesDelDMAS from "./jefesdeldmas/JefesDelDMAS";
import Sugerencias from "./sugerencias/Sugerencias";
import CategoriasBody from "./CategoriasBody";
import '../../styles/components/SectionBody.css'

/**
 * 
 * @param {*} props
 * logged.state estado global para sabe si se está logeado 
 * @returns dependiendo de la sección renderiza la compoennte necesaria.
 */
function SectionBody(props) {
    const {section} = useParams();

    return (
        <>
        {section === 'acercade'?<AcercaDe/>:
        section === 'jefesdeldmas'?<JefesDelDMAS/>:
        section === 'sugerencias'?<Sugerencias/>:
        section === 'quienessomos'?<></>:
        // Categorias provenientes de useParams
        <CategoriasBody categoria={section} loginState={props.logged.state}/>
        }
        </>
    )
}

const mapStateToProps = (state) =>{
    return{
        logged: state.logged,
    };
  };
  
  const mapDispatchToProps ={
    toggleLogin,
  };
  
const ConnectedSectionBody = connect(mapStateToProps, mapDispatchToProps)(SectionBody);
export default ConnectedSectionBody;
  
