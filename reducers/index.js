import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import CoinReducer from './CoinReducer';


export default combineReducers({
    search: SearchReducer,
    coins: CoinReducer
});