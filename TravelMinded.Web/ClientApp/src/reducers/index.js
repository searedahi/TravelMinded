import { combineReducers } from 'redux';
import experiencesReducer from './ExperiencesReducer';
import experienceDetailsReducer from './ExperienceDetailsReducer';
import customerTypeLineItemReducer from './CustomerTypeLineItemReducer';


const rootReducer = combineReducers({
    experiences: experiencesReducer,
    experienceDetails: experienceDetailsReducer,
    customerTypeLineItem: customerTypeLineItemReducer,
});

export default rootReducer;
