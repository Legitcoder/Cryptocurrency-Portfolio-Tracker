import {
    MATCH_SEARCH_ARRAY
} from '../actions/types';

const INITIAL_STATE = {
    searchArray: []
}

export default( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case MATCH_SEARCH_ARRAY:
            return {...INITIAL_STATE, searchArray: action.payload}
        default: 
            return INITIAL_STATE
    }
}