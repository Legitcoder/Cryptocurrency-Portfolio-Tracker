import axios from 'axios';
import {
    MATCH_SEARCH_ARRAY
} from './types';

export const matchSearchArray = (searchArray) => dispatch => {
    dispatch({ type: MATCH_SEARCH_ARRAY, payload: searchArray })
}