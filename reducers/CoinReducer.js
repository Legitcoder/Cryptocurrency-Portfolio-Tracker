import {
    GET_COINS,
    SELECT_COIN,
    GET_COIN_EXCHANGES_AND_TRADING_PAIRS,
    GET_TRADING_PAIRS_PRICE_HASH
} from '../actions/types';


export default( state = {}, action ) => {
    switch(action.type) {
        case GET_COINS:
            return {...state, coins: action.payload}
        case SELECT_COIN:
            return {...state, coin: action.payload}
        case GET_COIN_EXCHANGES_AND_TRADING_PAIRS:
            return {...state, exchanges: action.payload}
        case GET_TRADING_PAIRS_PRICE_HASH:
            return {...state, tradingPairsPrices: action.payload}
        default: 
            return state
    }
}