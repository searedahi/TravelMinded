import * as types from '../constants/ActionTypes';

export default function catalogReducer(state = { items: [] }, action) {
    switch (action.type) {
        case types.FETCH_ITEMS_BEGIN: {
            return {
                ...state,
            };
        }
        case types.FETCH_ITEMS_SUCCESS: {
            if (state.items.length === 0) {
                return {
                    ...state,
                    items: action.payload,
                };
            }
            return state;
        }
        case types.SYNC_QUANTITY: {
            const { quantity, item } = action.payload;

            state.items.map(thisItem =>
                thisItem.productName === item
                ? thisItem.quantity = quantity
                : null);

            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
