import { connect } from 'react-redux';
import setUsernameId from '../../redux/actions/setUsernameId';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { host } from '../../data/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { ShortLoading } from '../../elements/Loading';
import { faLock, faEye } from '@fortawesome/free-solid-svg-icons';
import toggleLogin from '../../redux/actions/toggleLogin';
import { useDispatch } from 'react-redux';
const FormLogin = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputName, setInputName] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(null);
    const [inputType, setInputType] = useState(false);
    const [redirectToAdmin, setRedirectToAdmin] = useState(false);

    axios.defaults.withCredentials = true;

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const startLoading = () => {
        setLoadingLogin(true);
    }

    const stopLoading = () => {
        setLoadingLogin(false);
    }

    const handleLoginError = (errorMessage) => {
        setErrorLogin(errorMessage);
    }

    const tooglePasword = () => {
        setInputType(!inputType);
    }

    const onChangeName = (e) => {
        const newValue = e.target.value;
        setInputName(newValue);
        setErrorLogin(null);
    }

    const onChangeMail = (e) => {
        const newValue = e.target.value;
        setInputMail(newValue);
        setErrorLogin(null);
    }

    const onSubmit = async () => {
        try {
            setErrorLogin(null);
            startLoading();

            const response = await axios.post(host + `:3001/post/login`, {
                username: watch('username'),
                password: watch('password')
            });

            const result = response.data;
            console.log("RESULT: " + JSON.stringify(result));
            console.log("Resultado NOMBRE: " + result[0].nombre);
            console.log("Resultado USERNAME: " + result[0].username);

            if ( result[0].idusuario === 1 ) {
                console.log("Es admin inicio sesion");
                localStorage.setItem('username', result[0].nombre)
                dispatch(toggleLogin(true));  // Usa dispatch para activar la acción
                props.setUsernameId(result[0].idusuario);
                // setRedirectToAdmin(true);
                navigate("/admin");
            }
        } catch (error) {
            handleLoginError(error.message);
        } finally {
            stopLoading();
        }
    }

    useEffect(() => {
        if (redirectToAdmin) {
            goToHome("/admin");
        }
    }, [redirectToAdmin]);

    const goToHome = (url) => {
        navigate(url);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='login-form'>
            <label htmlFor='name-user' className='textbox'>
                <input id='name-user' className='text-input' tabIndex="1" type='text' {...register('username')} required onChange={onChangeName} value={inputName} autoComplete="email"/>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
                <span className={inputName ? 'has-value' : ' '}>Correo Electrónico</span>
            </label>    
            <label htmlFor='password-user' className='textbox'>
                <input id='password-user' className='text-input' tabIndex="2" type={inputType ? 'text' : 'password'} {...register('password')} required onChange={onChangeMail} value={inputMail}/>
                <span className={inputMail ? 'has-value' : ' '}>Contraseña</span>
                <div id='toogle' onClick={tooglePasword}>
                {inputType ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faEye}/>} 
                </div>
            </label>
            <div id='login-container-btn'>
                <button className='login-btn' onClick={() => goToHome("/")} tabIndex="4" >Regresar</button>
                <input className='login-btn' type='submit' value='Iniciar sesión' tabIndex="3" />
            </div>
            
            <div id='spinner-error-container' className={errorLogin ? 'error' : ''}>
                {loadingLogin && <div className='loading'>
                    <ShortLoading/>
                </div>}
                {errorLogin && <div className='message'>
                    {errorLogin === 'Network Error' ? 'Inténtelo de nuevo más tarde' :
                        errorLogin === 'Request failed with status code 404' ? 'El correo y/o la contraseña son incorrectos' : ''}
                </div>}
            </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        usernameId: state.usernameId
    };
};

const mapDispatchToProps ={
    setUsernameId
}

const ConnectedFormLogin = connect(mapStateToProps, mapDispatchToProps)(FormLogin);
export default ConnectedFormLogin;
