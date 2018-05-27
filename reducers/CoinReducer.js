import {
    GET_COINS,
    SELECT_COIN,
    GET_COIN_EXCHANGES_AND_TRADING_PAIRS,
    GET_TRADING_PAIRS_PRICE_HASH
} from '../actions/types';

const INITIAL_STATE = {}

export default( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case GET_COINS:
            return {...INITIAL_STATE, coins: action.payload}
        case SELECT_COIN:
            return {...INITIAL_STATE, coin: action.payload}
        case GET_COIN_EXCHANGES_AND_TRADING_PAIRS:
            return {...INITIAL_STATE, exchanges: action.payload}
        case GET_TRADING_PAIRS_PRICE_HASH:
            return {...INITIAL_STATE, tradingPairsPrices: action.payload}
        default: 
            return state
    }
}