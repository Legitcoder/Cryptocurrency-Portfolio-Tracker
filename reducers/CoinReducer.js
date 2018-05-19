import {
    GET_COINS
} from '../actions/types';

const INITIAL_STATE = {}

export default( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case GET_COINS:
            return {...INITIAL_STATE, coins: action.payload}
        default: 
            return INITIAL_STATE
    }
}