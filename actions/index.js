import axios from 'axios';
import cryptoCompareApi from 'cryptocompare';
import {
    MATCH_SEARCH_ARRAY, 
    GET_COIN_HASH
} from './types';


const filterCoins = (coinHash) => {
    const coins = [];
    for(symbol in coinHash) {
        coins.push(coinHash[symbol]);
    }
    return coins
}

export const matchSearchArray = (searchArray) => dispatch => {
    dispatch({ type: MATCH_SEARCH_ARRAY, payload: searchArray })
}

export const getCoinHash = () => dispatch => {
//     cryptoCompareApi.priceFull(['LSK'], ['BTC'], {exchanges: ['Binance']})
// .then(prices => {
//   console.log(prices)
// })
// //Filter out all the exchanges that have LSK in an array and then
// //FIlter out all the trading Pairs of LSK
//     cryptoCompareApi.exchangeList()
// .then(exchangeList => {
//   console.log(exchangeList["BitTrex"]["LSK"])
// })
    cryptoCompareApi.coinList()
    .then(coinList => {
        filterCoins(coinList.Data);
        dispatch({ type: GET_COIN_HASH, payload: coinList.Data});
    })
}