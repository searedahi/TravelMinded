const requestExperienceDetailsType = 'REQUEST_EXPERIENCE_DETAILS';
const receiveExperienceDetailsType = 'RECEIVE_EXPERIENCE_DETAILS';

const initialState = { experienceDetails: {}, isLoading: false };

export const experienceDetailsActionCreators = {
    getExperienceDetails: id => async (dispatch, getState) => {
        if (id === getState().experienceDetails.id) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestExperienceDetailsType, id });

        const url = `api/Experience/${id}`;
        const response = await fetch(url);
        const experienceDetails = await response.json();

        dispatch({ type: receiveExperienceDetailsType, experienceDetails });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestExperienceDetailsType) {
        return {
            ...state,
            id: action.id,
            isLoading: true
        };
    }

    if (action.type === receiveExperienceDetailsType) {
        return {
            ...state,
            experienceDetails: action.experienceDetails,
            isLoading: false
        };
    }

    return state;
};
