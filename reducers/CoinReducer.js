import {
    GET_COINS,
    SELECT_COIN,
    GET_COIN_EXCHANGES_AND_TRADING_PAIRS,
    GET_TRADING_PAIRS_PRICE_HASH,
    GET_COIN_USD_PRICE,
    GET_COIN_BTC_PRICE,
    GET_COIN_ALL_USD_PRICES,
    GET_COIN_ALL_BTC_PRICES,
    GET_USD_COIN_INFO
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
        case GET_COIN_USD_PRICE: 
            return {...state, usdPrice: action.payload}
        case GET_COIN_BTC_PRICE:
            return {...state, btcPrice: action.payload}
        case GET_COIN_ALL_USD_PRICES:
            return {...state, allUsdPrices: action.payload}
        case GET_COIN_ALL_BTC_PRICES:
            return {...state, allBtcPrices: action.payload}
        case GET_USD_COIN_INFO:
            return {...state, priceInfo: action.payload}
        default: 
            return state
    }
}