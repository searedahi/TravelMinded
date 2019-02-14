const incrementQuantityType = 'INCREMENT_QUANTITY';
const decrementQuantityType = 'DECREMENT_QUANTITY';
const initialState = { customerType:null, quantity: 0 };

export const customerTypeLineItemActionCreators = {
    increment: () => ({ type: incrementQuantityType }),
    decrement: () => ({ type: decrementQuantityType })
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === incrementQuantityType) {
        return { ...state, quantity: state.quantity + 1 };
    }

    if (action.type === decrementQuantityType) {
        return { ...state, quantity: state.quantity - 1 };
    }

    return state;
};
