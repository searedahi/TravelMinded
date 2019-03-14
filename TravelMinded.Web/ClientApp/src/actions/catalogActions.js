import fetch from 'node-fetch';
import {
    FETCH_ITEMS_BEGIN, FETCH_ITEMS_SUCCESS, FETCH_ITMS_FAILURE, SYNC_QUANTITY,
} from '../constants/ActionTypes';

export function getData(payload) {
    return function (dispatch) {
        dispatch({ type: FETCH_ITEMS_BEGIN });
        fetch("https://api.myjson.com/bins/19dvvv")
            .then((response) => {
                dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: FETCH_ITMS_FAILURE, payload: err });
            });
    };
}

export function syncQuantity(payload) {
    return {
        type: SYNC_QUANTITY,
        payload,
    };
}
