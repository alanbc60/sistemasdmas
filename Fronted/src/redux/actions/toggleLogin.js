export const type = 'toggleLogin';

const toggleLogin = Boolean => {
    return {
        type,
        payload: Boolean
    };
};

export default toggleLogin;