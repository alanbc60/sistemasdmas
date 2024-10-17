import { connect } from 'react-redux';
import setUsernameId from '../../redux/actions/setUsernameId';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { host } from '../../data/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { ShortLoading } from '../../elements/Loading';
import toggleLogin from '../../redux/actions/toggleLogin';
import { useDispatch } from 'react-redux';

function FormLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputName, setInputName] = useState('');
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
            username: '',
            password: '',
        },
    });

    const tooglePassword = () => setInputType(!inputType);

    const onChangeName = (e) => {
        setInputName(e.target.value);
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
                username: watch('username'),
                password: watch('password'),
            });

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 place-items-center w-full m-0">
          {/* Username Input */}
          <label htmlFor="name-user" className="relative w-[90%]">
            <input
              id="name-user"
              type="text"
              className="text-input w-full h-15 p-5 border rounded-md border-gray-400 focus:border-uam-light transition-all"
              tabIndex="1"
              {...register('username')}
              required
              onChange={onChangeName}
              value={inputName}
              autoComplete="email"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute top-1/2 left-6 transform -translate-y-1/2 w-5 text-gray-400"
            />
            <span className={`absolute left-6 top-[20%] transition-all ${inputName ? 'translate-y-[-90%] text-uam' : ''}`}>
              Correo Electrónico
            </span>
          </label>
    
          {/* Password Input */}
          <label htmlFor="password-user" className="relative w-[90%]">
            <input
              id="password-user"
              type={inputType ? 'text' : 'password'}
              className="text-input w-full h-15 p-5 border rounded-md border-gray-400 focus:border-uam-light transition-all"
              tabIndex="2"
              {...register('password')}
              required
              onChange={onChangeMail}
              value={inputMail}
            />
            <span className={`absolute left-6 top-[20%] transition-all ${inputMail ? 'translate-y-[-90%] text-uam' : ''}`}>
              Contraseña
            </span>
            <div
              id="toogle"
              onClick={tooglePassword}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon icon={inputType ? faLock : faEye} className="w-5 text-gray-400" />
            </div>
          </label>
    
          {/* Buttons */}
          <div className="grid w-[90%] grid-cols-2 gap-3">
            <button
              type="button"
              className="login-btn text-lg bg-white border border-uam-color transition hover:bg-uam-light hover:text-white"
              onClick={goToHome}
              tabIndex="4"
            >
              Regresar
            </button>
            <input
              type="submit"
              value="Iniciar sesión"
              className="login-btn text-lg bg-uam-color text-white transition hover:bg-uam-mid"
              tabIndex="3"
            />
          </div>
    
          {/* Spinner / Error */}
          <div className={`relative w-[90%] h-15 rounded-md flex items-center justify-center ${errorLogin ? 'border border-uam-color' : ''}`}>
            {loadingLogin && <ShortLoading />}
            {errorLogin && (
              <div className="message text-uam">
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
