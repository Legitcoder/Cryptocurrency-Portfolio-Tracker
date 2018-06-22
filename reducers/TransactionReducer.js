import {
    GET_TRANSACTIONS,
    GET_COIN_TRANSACTIONS
} from '../actions/types';


export default( state = {}, action ) => {
    switch(action.type) {
        case GET_TRANSACTIONS:
            return {...state, transactions: action.payload}
        case GET_COIN_TRANSACTIONS: 
            return {...state, transactions: action.payload}
        default: 
            return state
    }
}