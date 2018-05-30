import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import CoinReducer from './CoinReducer';
import HoldingReducer from './HoldingReducer';


export default combineReducers({
    search: SearchReducer,
    coins: CoinReducer,
    holdings: HoldingReducer
});