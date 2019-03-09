import { ADD_CTLI, REMOVE_CTLI } from '../actions/CustomerTypeLineItem';

const initialState = { customerType: null, quantity: 0 };

export const customerTypeLineItemReducer = (state, action) => {
    state = state || initialState;

    if (action.type === ADD_CTLI) {
        return {
            ...state
            , customerType: action.ctli
            , quantity: state.quantity + 1
        };
    }

    if (action.type === REMOVE_CTLI) {
        return {
            ...state
            , customerType: action.ctli
            , quantity: state.quantity - 1
        };
    }

    return state;
};
