// Necesitarás una acción para actualizar el estado de autenticación en tu Redux store.

// La acción toggleLogin es útil para manejar el cambio del estado de autenticación en términos de "login" o "logout"

export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

const toggleLogin = (isLoggedIn) => {
    return {
        type: TOGGLE_LOGIN,
        payload: isLoggedIn
    };
};

export default toggleLogin;
