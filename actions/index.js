import axios from 'axios';
import cryptoCompareApi from 'cryptocompare';
import {
    MATCH_SEARCH_ARRAY,
    SELECT_COIN, 
    GET_COIN_EXCHANGES_AND_TRADING_PAIRS,
    GET_COINS,
} from './types';


const filterCoins = (coinHash) => {
    const coins = [];
    for(symbol in coinHash) {
        coins.push(coinHash[symbol]);
    }
    return coins;
}



export const getExchangesCoinBelongsTo = (coinSymbol) => dispatch => {
    const exchangesCoinBelongsTo = [];
    cryptoCompareApi.exchangeList()
    .then(exchangeHash => {
        for(exchange in exchangeHash) {
            if(exchangeHash[exchange][coinSymbol]) exchangesCoinBelongsTo.push({exchange: exchange, pairs: exchangeHash[exchange][coinSymbol]});
        }
        dispatch({ type: GET_COIN_EXCHANGES_AND_TRADING_PAIRS, payload: exchangesCoinBelongsTo });
    })
}

export const selectCoin = (coin) => dispatch => {
    dispatch({ type: SELECT_COIN, payload: coin })
}

export const matchSearchArray = (searchArray) => dispatch => {
    dispatch({ type: MATCH_SEARCH_ARRAY, payload: searchArray })
}

export const getCoins = () => dispatch => {
//     cryptoCompareApi.priceFull(['LSK'], ['BTC'], {exchanges: ['Binance']})
// .then(prices => {
//   console.log(prices)
// })
// //Filter out all the exchanges that have LSK in an array and then
// //FIlter out all the trading Pairs of LSK
    cryptoCompareApi.coinList()
    .then(coinList => {
        dispatch({ type: GET_COINS, payload: filterCoins(coinList.Data)});
    })
}