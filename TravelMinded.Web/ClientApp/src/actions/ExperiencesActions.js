export const FETCH_EXPERIENCES_BEGIN = 'FETCH_EXPERIENCES_BEGIN';
export const FETCH_EXPERIENCES_SUCCESS = 'FETCH_EXPERIENCES_SUCCESS';
export const FETCH_EXPERIENCES_FAILURE = 'FETCH_EXPERIENCES_FAILURE';

export const fetchExperiencesBegin = () => ({
    type: FETCH_EXPERIENCES_BEGIN,
});

export const fetchExperiencesSuccess = experiences => ({
    type: FETCH_EXPERIENCES_SUCCESS,
    experiences,
});

export const fetchExperiencesFailure = error => ({
    type: FETCH_EXPERIENCES_FAILURE,
    error,
});
