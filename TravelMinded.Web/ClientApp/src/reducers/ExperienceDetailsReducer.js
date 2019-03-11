import {
    FETCH_EXPERIENCE_DETAILS_BEGIN,
    FETCH_EXPERIENCE_DETAILS_SUCCESS,
    FETCH_EXPERIENCE_DETAILS_FAILURE,
} from '../actions/ExperienceDetailsActions';

const initialState = {
    experienceDetails: {},
    isLoading: false,
    tixToBuy: [],
};

const experienceDetailsReducer = (state = initialState, action) => {
    if (action.type === FETCH_EXPERIENCE_DETAILS_BEGIN) {
        return {
            ...state,
            id: action.id,
            isLoading: true,
        };
    }

    if (action.type === FETCH_EXPERIENCE_DETAILS_SUCCESS) {
        return {
            ...state,
            experienceDetails: action.experienceDetails,
            isLoading: false,
        };
    }

    if (action.type === FETCH_EXPERIENCE_DETAILS_FAILURE) {
        return {
            ...state,
            error: action.error,
            isLoading: false,
        };
    }

    return state;
};

export default experienceDetailsReducer;
