export const type = 'setUsernameId';

const setUsernameId = text => {
    return {
        type,
        payload: text
    };
};

export default setUsernameId;