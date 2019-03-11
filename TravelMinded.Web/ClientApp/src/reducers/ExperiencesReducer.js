import {
    FETCH_EXPERIENCES_BEGIN,
    FETCH_EXPERIENCES_SUCCESS,
    FETCH_EXPERIENCES_FAILURE,
} from '../actions/ExperiencesActions';

const initialState = { experiences: [], isLoading: true };

const experiencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXPERIENCES_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_EXPERIENCES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                experiences: action.experiences,
            };
        case FETCH_EXPERIENCES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default experiencesReducer;
