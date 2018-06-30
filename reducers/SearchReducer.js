import {
    MATCH_SEARCH_ARRAY,
    CLEAR_SEARCH_ARRAY
} from '../actions/types';

const INITIAL_STATE = {
    searchArray: []
}

export default( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case MATCH_SEARCH_ARRAY:
            return {...state, searchArray: action.payload}
        default: 
            return state
    }
}