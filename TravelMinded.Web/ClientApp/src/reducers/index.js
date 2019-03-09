import { combineReducers } from 'redux';
import { experienceReducer } from './Experiences';
import { experienceDetailsReducer } from './ExperienceDetails';
import { customerTypeLineItemReducer } from './CustomerTypeLineItem';


const rootReducer = combineReducers({
    experiences: experienceReducer,
    experienceDetails: experienceDetailsReducer,
    customerTypeLineItem: customerTypeLineItemReducer
})

export default rootReducer