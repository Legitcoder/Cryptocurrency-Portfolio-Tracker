import axios from 'axios';
import cryptoCompareApi from 'cryptocompare';
import {
    MATCH_SEARCH_ARRAY, 
    GET_COINS
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

export const getCoins = () => dispatch => {
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
        dispatch({ type: GET_COINS, payload: filterCoins(coinList.Data)});
    })
}