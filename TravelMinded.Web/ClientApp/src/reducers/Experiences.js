const requestExperiencesTypeAll = 'REQUEST_EXPERIENCES_ALL';
const receiveExperiencesTypeAll = 'RECEIVE_EXPERIENCES_ALL';

const initialState = { experiences: [], isLoading: true };

export const experienceActionCs = {


    loadAllExperiences: () => async (dispatch, getState) => {
        dispatch({ type: requestExperiencesTypeAll });

        const url = `api/Experience/All`;
        const response = await fetch(url);
        const experiences = await response.json();

        dispatch({ type: receiveExperiencesTypeAll, experiences });
    }
};

export const experienceReducer = (state = initialState, action) => {

    switch (action.type) {

        case requestExperiencesTypeAll:
            return {
                ...state,
                isLoading: true
            };
        case receiveExperiencesTypeAll:
            return {
                ...state,
                isLoading: false,
                experiences: action.experiences
            };
        default:
            return state;
    }
};
