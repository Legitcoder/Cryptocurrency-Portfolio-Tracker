import { AsyncStorage } from 'react-native';
import cryptoCompareApi from 'cryptocompare';
import {
    MATCH_SEARCH_ARRAY,
    SELECT_COIN, 
    GET_COIN_EXCHANGES_AND_TRADING_PAIRS,
    GET_COINS,
    GET_TRADING_PAIRS_PRICE_HASH,
    GET_HOLDINGS,
    GET_COIN_USD_PRICE
} from './types';

//To be fixed: Instead of selecting a coin and seeing N/A and no trading pair available in Transaction Form. User shouldn't populate
// a coin in searchArray that has no exchanges being traded on. filtercoins and getCoins returns all coins instead of filtering only the
//ones with at least one exchange being traded on. 

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

export const getCoinUSDPrice = (selectedCoin) => dispatch => {
    cryptoCompareApi.price(selectedCoin, ["USD"])
    .then(prices => {
        dispatch({ type: GET_COIN_USD_PRICE, payload: prices });
    })    
}

export const getTradingPairsPriceHash = (selectedCoin, tradingPairs, selectedExchange) => dispatch => {
    cryptoCompareApi.price(selectedCoin, tradingPairs, { exchanges: [selectedExchange] })
    .then(prices => {
        dispatch({ type: GET_TRADING_PAIRS_PRICE_HASH, payload: prices });
    })    
}

export const getCoins = () => dispatch => {
    //Testing Getting Price
    // cryptoCompareApi.price("DLISK", ["USD"])
    // .then(prices => console.log(prices))
    cryptoCompareApi.coinList()
    .then(coinList => {
        dispatch({ type: GET_COINS, payload: filterCoins(coinList.Data)});
    })
}

export const getHoldings =  () => dispatch => {
    AsyncStorage.getItem('holdings').then( existingHoldings => {
        dispatch({ type: GET_HOLDINGS, payload: JSON.parse(existingHoldings) });  
    });
}

export const saveHolding = (holding) => dispatch => {
    AsyncStorage.getItem('holdings').then( existingHoldings => {
        let holdings;
        existingHoldings ? holdings  = JSON.parse(existingHoldings) : holdings = [];
        holdings.push(holding);
        existingHoldings ? AsyncStorage.setItem('holdings', JSON.stringify(holdings)) : AsyncStorage.setItem('holdings', JSON.stringify([holding]));
    })
}


//// Helper Methods

const filterCoins = (coinHash) => {
    const coins = [];
    for(symbol in coinHash) coins.push(coinHash[symbol]);
    return coins;
}