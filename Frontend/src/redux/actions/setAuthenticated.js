export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

const setAuthenticated = (isAuthenticated) => {
    return {
        type: SET_AUTHENTICATED,
        payload: isAuthenticated
    };
};

export default setAuthenticated;
