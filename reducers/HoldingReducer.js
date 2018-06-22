import {
    GET_HOLDINGS, 
    SELECT_COIN, 
    SELECT_HOLDING,
    GET_HOLDING
} from '../actions/types';


export default( state = {}, action ) => {
    switch(action.type) {
        case GET_HOLDINGS:
            return {...state, holdings: action.payload}
        case SELECT_HOLDING: 
            return {...state, holding: action.payload}
        case GET_HOLDING: 
            return {...state, holding: action.payload}
        default: 
            return state
    }
}