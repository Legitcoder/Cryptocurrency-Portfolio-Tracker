import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import CoinReducer from './CoinReducer';
import HoldingReducer from './HoldingReducer';
import TransactionReducer from './TransactionReducer';


export default combineReducers({
    search: SearchReducer,
    coins: CoinReducer,
    holdings: HoldingReducer,
    transactions: TransactionReducer
});