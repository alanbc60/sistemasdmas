import {type as setUsernameIdType} from '../actions/setUsernameId'

const defaultState = "";

function reducer(state = defaultState, {type, payload}){
    switch(type){
        case setUsernameIdType: 
            return {
                state: payload
            };
        default: 
            return state;
    }
}

export default reducer;