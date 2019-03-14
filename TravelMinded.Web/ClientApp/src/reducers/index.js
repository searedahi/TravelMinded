import { combineReducers } from 'redux';
import experiences from './ExperiencesReducer';
import experienceDetails from './ExperienceDetailsReducer';
import customerTypeLineItem from './CustomerTypeLineItemReducer';
import bookingCalculator from './BookingCalculatorReducer';
import cart, * as fromCart from './cartReducer';
import products, * as fromProducts from './products';

const rootReducer = combineReducers({
    experiences,
    experienceDetails,
    customerTypeLineItem,
    bookingCalculator,
    cart,
    products,
});

export default rootReducer;

const getAddedIds = state => fromCart.getAddedIds(state.cart);

const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id);

const getProduct = (state, id) => fromProducts.getProduct(state.products, id);

export const getTotal = state => getAddedIds(state).reduce((total, id) => total + getProduct(state, id).price * getQuantity(state, id), 0).toFixed(2);

export const getCartProducts = state => getAddedIds(state).map(id => ({ ...getProduct(state, id), quantity: getQuantity(state, id) }));
