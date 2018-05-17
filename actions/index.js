import axios from 'axios';
import cryptoCompareApi from 'cryptocompare';
import {
    MATCH_SEARCH_ARRAY, 
    GET_COIN_HASH
} from './types';

export const matchSearchArray = (searchArray) => dispatch => {
    dispatch({ type: MATCH_SEARCH_ARRAY, payload: searchArray })
}

export const getCoinHash = () => dispatch => {
    cryptoCompareApi.coinList()
    .then(coinList => {
        dispatch({ type: GET_COIN_HASH, payload: coinList.Data});
    })
}