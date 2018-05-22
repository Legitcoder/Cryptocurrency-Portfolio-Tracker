import {
    GET_COINS,
    SELECT_COIN
} from '../actions/types';

const INITIAL_STATE = {}

export default( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case GET_COINS:
            return {...INITIAL_STATE, coins: action.payload}
        case SELECT_COIN:
            return {...INITIAL_STATE, coin: action.payload}
        default: 
            return INITIAL_STATE
    }
}