// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import setUsernameId from '../../redux/actions/setUsernameId';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { host } from '../../data/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { ShortLoading } from '../../components/generalSections/Loading';
import toggleLogin from '../../redux/actions/toggleLogin';
import { useDispatch } from 'react-redux';



function FormLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputPassword, setInputPassword] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(null);
    const [inputType, setInputType] = useState(false);
    const [redirectToAdmin, setRedirectToAdmin] = useState(false);
    
    axios.defaults.withCredentials = true;


    useEffect(() => {
        if (redirectToAdmin) {
            navigate('/admin');
        }
    }, [navigate, redirectToAdmin]);


    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            mail: '',
            password: '',
        },
    });

    const tooglePassword = () => setInputType(!inputType);

    const onChangePassword = (e) => {
        setInputPassword(e.target.value);
        setErrorLogin(null);
    };

    const onChangeMail = (e) => {
        setInputMail(e.target.value);
        setErrorLogin(null);
    };

    const onSubmit = async () => {
        try {
            setErrorLogin(null);
            setLoadingLogin(true);
            
            const response = await axios.post(host + ':3001/post/login', {
                mail: watch('mail'),
                password: watch('password'),
            });
            console.log(response.data);

            const result = response.data;

            if (result[0].idusuario === 1) {
                console.log("Es admin inicio sesion");
                localStorage.setItem('username', result[0].nombre)
                dispatch(toggleLogin(true));  // Usa dispatch para activar la acción
                setUsernameId(result[0].idusuario);
                navigate("/admin");
            }
        } catch (error) {
            setErrorLogin(error.message);
        } finally {
            setLoadingLogin(false);
        }
    };

    const goToHome = () => navigate('/');
    const inputStyle= 'bg-white w-full h-15 p-5 border border-[1px] border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-500 autofill:bg-white autofill:shadow-[inset_0_0_0px_50px_white]';
    const buttonStyle = 'text-lg min-h-[60px] px-4 py-2 rounded-lg hover:bg-orange-300 hover:shadow-[inset_0_0_0px_2px_white] transition-all duration-500 cursor-pointer';
    const inputBeforeTransition = 'absolute left-6 top-[30%] px-2 transition-all duration-500 text-orange-uam ';
    const inputAfeterTransition = 'translate-y-[-120%] translate-x-[-15%] bg-white text-[13px]';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 place-items-center w-full m-0">
            {/* Email Input */}
            <label htmlFor="name-user" className="relative w-[95%] min-w-[225px]">
                <input
                    id="name-user"
                    type="text"
                    className={`${inputStyle}`}
                    tabIndex="1"
                    {...register('mail')}
                    required
                    onChange={onChangeMail}
                    value={inputMail}
                    autoComplete="email"
                />
                <div
                    id="toogle"
                    className="absolute right-6 top-1/2 transform -translate-y-1/2"
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        className="w-5 text-gray-400"
                    />
                </div>

                <span className={`${inputBeforeTransition} ${inputMail ? inputAfeterTransition : ''}`}>
                    Correo Electrónico
                </span>
            </label>

            {/* Password Input */}
            <label htmlFor="password-user" className="relative w-[95%] min-w-[225px]">
                <input
                    id="password-user"
                    type={inputType ? 'text' : 'password'}
                    className={`${inputStyle}`}
                    tabIndex="2"
                    {...register('password')}
                    required
                    onChange={onChangePassword}
                    value={inputPassword}
                />
                <span className={`${inputBeforeTransition} ${inputPassword ? inputAfeterTransition : ''}`}>
                    Contraseña
                </span>
                <div
                    id="toogle"
                    onClick={tooglePassword}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={inputType ? faLock : faEye}
                        className="w-5 text-gray-400" />
                </div>
            </label>

            {/* Buttons */}
            <div className="grid w-[90%] grid-cols-2 gap-3">
                <button
                    type="button"
                    className={` bg-white border border-[1px] border-orange-300 ${buttonStyle} hover:border-none`}
                    onClick={goToHome}
                    tabIndex="4"
                >
                    Regresar
                </button>
                <input
                    type="submit"
                    value="Iniciar sesión"
                    className={`${buttonStyle} text-white bg-orange-uam`}
                    tabIndex="3"
                />
            </div>

            {/* Spinner / Error */}
            <div className={`relative w-[90%] h-15 py-3 rounded-lg text-orange-uam flex items-center justify-center ${errorLogin ? 'border border-orange-uam' : ''}`}>
                {loadingLogin && <ShortLoading />}
                {errorLogin && (
                    <div className="message text-orange-uam">
                        {errorLogin === 'Network Error'
                            ? 'Inténtelo de nuevo más tarde'
                            : errorLogin === 'Request failed with status code 404'
                                ? 'El correo y/o la contraseña son incorrectos'
                                : ''}
                    </div>
                )}
            </div>
        </form>
    );

}

const mapStateToProps = (state) => ({
    usernameId: state.usernameId,
});

const mapDispatchToProps = { setUsernameId };

const ConnectedFormLogin = connect(mapStateToProps, mapDispatchToProps)(FormLogin);
export default ConnectedFormLogin;