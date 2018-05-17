import {
    GET_COIN_HASH
} from '../actions/types';

const INITIAL_STATE = {}

export default( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case GET_COIN_HASH:
            return {...INITIAL_STATE, coinHash: action.payload}
        default: 
            return INITIAL_STATE
    }
}