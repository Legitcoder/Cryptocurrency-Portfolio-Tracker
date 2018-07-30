import { AsyncStorage } from 'react-native';
import cryptoCompareApi from 'cryptocompare';
import {
    MATCH_SEARCH_ARRAY,
    SELECT_COIN, 
    GET_COIN_EXCHANGES_AND_TRADING_PAIRS,
    GET_COINS,
    GET_TRADING_PAIRS_PRICE_HASH,
    GET_HOLDINGS,
    GET_HOLDING,
    SELECT_HOLDING,
    GET_TRANSACTIONS,
    GET_COIN_TRANSACTIONS,
    GET_COIN_USD_PRICE,
    GET_COIN_BTC_PRICE,
    GET_COIN_ALL_USD_PRICES,
    GET_COIN_ALL_BTC_PRICES,
    GET_USD_COIN_INFO,
    GET_PRICE_ON_SPECIFIC_DATE,
    UPDATE_TRANSACTION
} from './types';

//To be fixed: Instead of selecting a coin and seeing N/A and no trading pair available in Transaction Form. User shouldn't populate
// a coin in searchArray that has no exchanges being traded on. filtercoins and getCoins returns all coins instead of filtering only the
//ones with at least one exchange being traded on. 


export const getUSDCoinInfo = (coinSymbol) => dispatch => {
    cryptoCompareApi.priceFull([coinSymbol], ['USD'])
        .then(priceInfo => {
            dispatch({ type: GET_USD_COIN_INFO, payload: priceInfo[coinSymbol]['USD']});
        });
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

export const getPriceOnSpecficDate = (symbol, date) => dispatch => {
    let pairs = ['USD', 'BTC'];
    if(symbol === 'BTC') pairs = ['USD'];
    cryptoCompareApi.priceHistorical(symbol, pairs, date)
        .then(prices => {
            dispatch({ type: GET_PRICE_ON_SPECIFIC_DATE, payload: prices[symbol] });
        })
}

export const getHistoricalUSDPrices = (symbol) => dispatch => {
    cryptoCompareApi.histoDay(symbol, 'USD', {limit: 'none'})
    .then(stockData =>{
        setDate(stockData);
        dispatch({ type: GET_COIN_ALL_USD_PRICES, payload: stockData })
    });
}

export const getHistoricalBTCPrices = (symbol) =>  dispatch => {
    cryptoCompareApi.histoDay(symbol, symbol === 'BTC' ? 'USD': 'BTC', {aggregate: 35}, {limit: 'none'})
    .then(stockData =>{
        setDate(stockData);
        dispatch({ type: GET_COIN_ALL_BTC_PRICES, payload: stockData })
    });
}

export const updateCoinsCurrentUsdPrices = (transaction) => dispatch => {
    AsyncStorage.multiGet(['holdings', 'transactions']).then( store => {
        const holdings = JSON.parse(store[0][1]);
        const transactions = JSON.parse(store[1][1]);
        const coins = holdings.map( holding => holding.coin);
        const coinSymbols = coins.map( coin => coin.Symbol);
        cryptoCompareApi.priceMulti(coinSymbols, ["USD"])
        .then(priceHash => {
            transactions.forEach( transaction => transaction.currentUSDPrice = priceHash[transaction.coin.Symbol]["USD"]);
            holdings.forEach( holding => holding.currentUSDPrice = priceHash[holding.coin.Symbol]["USD"]);
            AsyncStorage.multiSet([['holdings', JSON.stringify(holdings)], ['transactions', JSON.stringify(transactions)]]);
            dispatch({ type: GET_HOLDINGS, payload: holdings });
        })
    });   

} 

export const updateTransaction = (existingTransaction, formTransaction) => dispatch => {
    AsyncStorage.multiGet(['holdings', 'transactions']).then( store => {
        const holdings = JSON.parse(store[0][1]);
        const transactions = JSON.parse(store[1][1]);
        let existingHolding, difference;
        //Tried to use filter, didn't work
        holdings.forEach( holding => {
            if(holding.coin.CoinName === formTransaction.coin.CoinName){
                existingHolding = holding;
        }});
        transactions.forEach( (currentTransaction, index ) => {
            if(JSON.stringify(currentTransaction) === JSON.stringify(existingTransaction)) {
                 difference = formTransaction.amount - currentTransaction.amount;
                 existingHolding.amount = (Number(difference) + Number(existingHolding.amount)).toString(); 
                 transactions[index] = formTransaction;
            }
        });
        AsyncStorage.multiSet([['holdings', JSON.stringify(holdings)], ['transactions', JSON.stringify(transactions)]]); 
        dispatch({type: UPDATE_TRANSACTION, payload: {}}); 
    });
}


export const getHolding = (coin, transaction) => dispatch => {
    AsyncStorage.getItem('holdings').then( existingholdings => {
        let holdings, holding, existingHolding;
        existingholdings ? holdings  = JSON.parse(existingholdings) : holdings = [];
        if(existingholdings && existingholdings.length !== 0) existingHolding = holdings.filter((holding) => holding.coin.Symbol === transaction.coin.Symbol)[0];
        dispatch({ type: GET_HOLDING, payload: existingHolding ? existingHolding : transaction }); 
    });   
}

export const getHoldings =  () => dispatch => {
    AsyncStorage.getItem('holdings').then( existingHoldings => {
        dispatch({ type: GET_HOLDINGS, payload: JSON.parse(existingHoldings) });  
    });
}

export const selectHolding = (holding) => dispatch => {
    dispatch({ type: SELECT_HOLDING, payload: holding })
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

export const getCoinBTCPrice = (selectedCoin) => dispatch => {
    cryptoCompareApi.price(selectedCoin, ["BTC"])
    .then(prices => {
        dispatch({ type: GET_COIN_USD_PRICE, payload: prices });
    })    
}

export const getTradingPairsPriceHash = (selectedCoin, tradingPairs, selectedExchange) => dispatch => {
    //debugger;
    cryptoCompareApi.price(selectedCoin, tradingPairs, { exchanges: [selectedExchange] })
    .then(prices => {
        dispatch({ type: GET_TRADING_PAIRS_PRICE_HASH, payload: prices });
    })    
}

export const getCoins = () => dispatch => {
    // //Testing Getting Price
    cryptoCompareApi.price(["LSK"], ["USD"])
    .then(prices => console.log(prices))
    getHistoricalBTCPrices("LSK");
    cryptoCompareApi.coinList()
    .then(coinList => {
        dispatch({ type: GET_COINS, payload: filterCoins(coinList.Data)});
    })
}

export const getCoinTransactions = (coin) => dispatch => {
    AsyncStorage.getItem('transactions').then(existingTransactions => {
        let matchingTransactions = JSON.parse(existingTransactions).filter(transaction => transaction.coin.CoinName === coin.CoinName);
        dispatch({type: GET_COIN_TRANSACTIONS, payload: matchingTransactions});
    })
}

export const getTransactions = () => dispatch => {
    AsyncStorage.getItem('transactions').then( existingTransactions => {
        dispatch({ type: GET_TRANSACTIONS, payload: JSON.parse(existingTransactions) });  
    });
}

export const saveTransaction = (transaction) => dispatch => {
    AsyncStorage.getItem('transactions').then( existingTransactions => {
        let transactions;
        existingTransactions ? transactions  = JSON.parse(existingTransactions) : transactions = [];
        transactions.push(transaction);
        if(transactions.length !== 0) saveHolding(transaction);
        existingTransactions ? AsyncStorage.setItem('transactions', JSON.stringify(transactions)) : AsyncStorage.setItem('transactions', JSON.stringify([transaction]));
    })
}

export const deleteTransaction = (transaction) => dispatch => {
    AsyncStorage.multiGet(['holdings', 'transactions']).then( store => {
        const storedHoldings = JSON.parse(store[0][1]);
        const storedTransactions = JSON.parse(store[1][1]);
        const storedTransaction = storedTransactions.filter( currentTransaction => JSON.stringify(currentTransaction) === JSON.stringify(transaction))[0];
        updateHolding(storedHoldings, storedTransaction);
        storedTransactions.splice(storedTransactions.indexOf(storedTransaction), 1);
        AsyncStorage.setItem('transactions', JSON.stringify(storedTransactions));
    })
}


const updateHolding = (storedHoldings, transaction) => {
    const storedHolding = storedHoldings.filter(holdings => holdings.coin.CoinName === transaction.coin.CoinName)[0];
    storedHolding.amount = Number(storedHolding.amount) - Number(transaction.amount);
    if(storedHolding.amount === 0) storedHoldings.splice(storedHoldings.indexOf(storedHolding), 1);
    debugger;
    AsyncStorage.setItem('holdings', JSON.stringify(storedHoldings));
}


//// Helper Methods

const saveHolding = (transaction) => {
    AsyncStorage.getItem('holdings').then( existingholdings => {
        let holdings, holding;
        existingholdings ? holdings  = JSON.parse(existingholdings) : holdings = [];
        if(holdings.length !== 0) consolidateHoldings(holdings, transaction);
        existingholdings ? AsyncStorage.setItem('holdings', JSON.stringify(holdings)) : AsyncStorage.setItem('holdings', JSON.stringify([transaction]));
    })
}

const consolidateHoldings = (holdings, transaction) => {
    let existingHolding = holdings.filter((holding) => holding.coin.Symbol === transaction.coin.Symbol)
    if(existingHolding.length === 0) {
        holdings.push(transaction);
    }
    existingHolding.forEach(holding => {
        if( holding.coin.Symbol === transaction.coin.Symbol ) {
            holding.amount = (Number(holding.amount) + Number(transaction.amount)).toString();
        }
        else{
            holdings.push(transaction);
        }
    })
}

const filterCoins = (coinHash) => {
    const coins = [];
    for(symbol in coinHash) coins.push(coinHash[symbol]);
    return coins;
}

const setDate = (stockData) => {
    stockData.forEach(instance => {
        instance.date = toDateTime(instance.time);
        instance.x = toDateTime(instance.time)
    })
}

const toDateTime = (secs) => {
    let t = new Date();
    t.setTime(secs * 1000);
    return t;
} 