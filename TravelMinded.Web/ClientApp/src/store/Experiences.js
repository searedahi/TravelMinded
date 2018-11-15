const requestExperiencesType = 'REQUEST_EXPERIENCES';
const receiveExperiencesType = 'RECEIVE_EXPERIENCES';
const requestExperiencesTypeAll = 'REQUEST_EXPERIENCES_ALL';
const receiveExperiencesTypeAll = 'RECEIVE_EXPERIENCES_ALL';

const initialState = { experiences: [], isLoading: false };

export const actionCreators = {
    requestExperiences: startDateIndex => async (dispatch, getState) => {
        if (startDateIndex === getState().experiences.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestExperiencesType, startDateIndex });

        const url = `api/Experience/AvailableAfter?startDateIndex=${startDateIndex}`;
        const response = await fetch(url);
        const experiences = await response.json();

        dispatch({ type: receiveExperiencesType, startDateIndex, experiences });
    },

    loadAllExperiences: () => async (dispatch, getState) => {
        dispatch({ type: requestExperiencesTypeAll });

        const url = `api/Experience/All`;
        const response = await fetch(url);
        const experiences = await response.json();

        dispatch({ type: receiveExperiencesTypeAll, experiences });
    }


};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestExperiencesType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            isLoading: true
        };
    }

    if (action.type === receiveExperiencesType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            experiences: action.experiences,
            isLoading: false
        };
    }

    if (action.type === requestExperiencesTypeAll) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveExperiencesTypeAll) {
        return {
            ...state,
            experiences: action.experiences,
            isLoading: false
        };
    }

    return state;
};
