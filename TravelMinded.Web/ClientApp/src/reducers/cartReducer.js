﻿import * as types from '../constants/ActionTypes';

const initialState = {
    addedIds: [],
    quantityById: {},
};

const addedIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            if (state.indexOf(action.productId) !== -1) {
                return state;
            }
            return [...state, action.productId];
        default:
            return state;
    }
};

const quantityById = (state = initialState.quantityById, action) => {
    const { productId } = action;

    switch (action.type) {
        case types.ADD_TO_CART:
            return {
                ...state,
                [productId]: (state[productId] || 0) + 1,
            };
        default:
            return state;
    }
};

export const getQuantity = (state, productId) => state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state = initialState, action) => {
    switch (action.type) {
        case types.CHECKOUT_REQUEST:
            return initialState;
        case types.CHECKOUT_FAILURE:
            return action.cart;
        default:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action),
            };
    }
};

export default cart;
