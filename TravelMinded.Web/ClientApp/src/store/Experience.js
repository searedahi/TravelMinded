const requestExperienceDetailsType = 'REQUEST_EXPERIENCE_DETAILS';
const receiveExperienceDetailsType = 'RECEIVE_EXPERIENCE_DETAILS';

const initialState = { experience: null, isLoading: false};

export const experienceActionCreators = {
    getExperience: id => async (dispatch, getState) => {
        if (id === getState().experience.id) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestExperienceDetailsType, id });

        const url = `api/Experience/${id}`;
        const response = await fetch(url);
        const experience = await response.json();

        dispatch({ type: receiveExperienceDetailsType, experience });
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
            experience: action.experience,
            isLoading: false
        };
    }

    return state;
};
