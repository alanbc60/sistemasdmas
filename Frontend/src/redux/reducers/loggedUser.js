import {type as toggleLoginType} from '../actions/toggleLogin'

const defaultState = false;


/**
 * Reducer for loggedUser. Handles toggleLogin action type.
 * Returns the next state given the current state and action.
 * @param {boolean} state - Current state of the logged user.
 * @param {Object} action - An object containing the type and payload of the action.
 * @returns {boolean} The next state of the logged user.
 */

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