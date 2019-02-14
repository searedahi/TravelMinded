import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import * as Experiences from './Experiences';
import * as ExperienceDetails from './ExperienceDetails';
import * as CustomerTypeLineItem from './CustomerTypeLineItem';


const rootReducer = (history) => combineReducers({
    count: {
        Counter

    },
    router: connectRouter(history)
})

export default rootReducer