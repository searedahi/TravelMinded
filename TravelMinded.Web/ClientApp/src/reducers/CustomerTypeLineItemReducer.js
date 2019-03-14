import {
    INCREMENT_CTLI,
    DECREMENT_CTLI,
} from '../actions/CustomerTypeLineItemActions';

const initialState = {
    customerType: null,
    quantity: 0,
};

const customerTypeLineItem = (state = initialState, action) => {
    if (action.type === INCREMENT_CTLI) {
        return {
            ...state,
            customerType: action.ctli,
            quantity: state.quantity + 1,
        };
    }

    if (action.type === DECREMENT_CTLI) {
        return {
            ...state,
            customerType: action.ctli,
            quantity: state.quantity - 1,
        };
    }

    return state;
};

export default customerTypeLineItem;
