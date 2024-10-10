import '../styles/elements/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { host } from '../data/host';
import { connect } from 'react-redux';
import toggleLogin from '../redux/actions/toggleLogin';
import { useState } from 'react';
import { ShortLoading } from './Loading';
// Add the specific icons you need
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



/**
 * 
 * @param {*} props 
 * recibe el estado global y la manera de actualizarlo.
 * @returns componente que renderiza el header principal que contiene el boton de inicio de sesión y el nombre, además de encarga de redireccionar en caso de hacer click en alguno de ellos
 */
function Header(props) {

    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const goToLogin = () => {
        navigate("/login")
    }
    
    const goToCrudAdmin = () => {
        navigate("/admin")
    }

    const sessionBtn = () => {
        if (props.logged.state) {
            Swal.fire({
                title: 'Terminará tu sesión actual',
                text: '¿Está seguro que desea terminar su sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No',
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        setLogoutLoading(true)
                        const getLogout = async () => {
                            const response = await axios.post(host + ":3001/post/logout")
                            const result = response.data
                            console.log(result)
                            props.toggleLogin(false)
                        }
                        getLogout();
                    } catch (error) {
                        console.log(error.message)
                    } finally {
                        setLogoutLoading(false)
                    }
                }
              });
           
        } else {
            goToLogin();
        }
    }
    
    const adminBtn = () => {
        if (props.logged.state) {
            try {
                goToCrudAdmin();
            } catch (error) {
                console.log(error.message)
            }
        } 
    }


    return (
        <header id='top-nav'>
            <div id='titulo-nav-container'>
                <NavLink to='/'>
                    <h1>Departamento de Matemáticas Aplicadas y Sistemas</h1>
                </NavLink>
            </div>
            <div id='session-nav-container'>
                <button className='session-btn' onClick={sessionBtn}>
                    <span >{props.logged.state ? "Cerrar sesión" : 'Iniciar sesión'}</span>
                    {logoutLoading ? <ShortLoading /> : <FontAwesomeIcon icon={faCircleUser} />}
                </button>
                {props.logged.state ? (
                    <>
                        <button className='session-adm' onClick={adminBtn}>
                        <span >Administrador</span>
                            <FontAwesomeIcon icon={faUserTie} />
                        </button>
                    </>
                ) : null}
            </div>
        </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);