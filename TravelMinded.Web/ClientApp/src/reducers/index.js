import { combineReducers } from 'redux'
import { experienceReducer } from './Experiences';


const rootReducer = combineReducers({
    experiences: experienceReducer
})

export default rootReducer