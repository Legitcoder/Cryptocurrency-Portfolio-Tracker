import {
    GET_HOLDINGS
} from '../actions/types';


export default( state = {}, action ) => {
    switch(action.type) {
        case GET_HOLDINGS:
            return {...state, holdings: action.payload}
        default: 
            return state
    }
}