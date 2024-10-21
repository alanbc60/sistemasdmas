import {type as toggleLoginType} from '../actions/toggleLogin'

const defaultState = false;

function reducer(state = defaultState, {type, payload}){
    switch(type){
        case toggleLoginType: 
            return {
                state: payload
            };
        default: 
            return state;
    }
}

export default reducer;