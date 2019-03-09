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

const ExperienceDetailsReducer = (state, action) => {
    const scopedState = state || initialState;

    if (action.type === FETCH_EXPERIENCE_DETAILS_BEGIN) {
        return {
            ...scopedState,
            id: action.id,
            isLoading: true,
        };
    }

    if (action.type === FETCH_EXPERIENCE_DETAILS_SUCCESS) {
        return {
            ...scopedState,
            experienceDetails: action.experienceDetails,
            isLoading: false,
        };
    }

    if (action.type === FETCH_EXPERIENCE_DETAILS_FAILURE) {
        return {
            ...scopedState,
            error: action.error,
            isLoading: false,
        };
    }

    return state;
};

export default ExperienceDetailsReducer;
