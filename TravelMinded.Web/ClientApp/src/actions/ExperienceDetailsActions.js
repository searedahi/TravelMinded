export const FETCH_EXPERIENCE_DETAILS_BEGIN = 'FETCH_EXPERIENCE_DETAILS_BEGIN';
export const FETCH_EXPERIENCE_DETAILS_SUCCESS = 'FETCH_EXPERIENCE_DETAILS_SUCCESS';
export const FETCH_EXPERIENCE_DETAILS_FAILURE = 'FETCH_EXPERIENCE_DETAILS_FAILURE';

export const fetchExperienceDetailsBegin = experienceId => ({
    type: FETCH_EXPERIENCE_DETAILS_BEGIN,
    experienceId,
});

export const fetchExperienceDetailsSuccess = experienceDetails => ({
    type: FETCH_EXPERIENCE_DETAILS_SUCCESS,
    experienceDetails,
});

export const fetchExperienceDetailsFailure = error => ({
    type: FETCH_EXPERIENCE_DETAILS_FAILURE,
    error,
});
