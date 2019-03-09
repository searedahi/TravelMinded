export const FETCH_EXPERIENCE_DETAILS_BEGIN = 'FETCH_EXPERIENCE_DETAILS_BEGIN';
export const FETCH_EXPERIENCE_DETAILS_SUCCESS = 'FETCH_EXPERIENCE_DETAILS_SUCCESS';
export const FETCH_EXPERIENCE_DETAILS_FAILURE = 'FETCH_EXPERIENCE_DETAILS_FAILURE';

export const RECEIEVE_EXPERIENCE_DETAILS_TYPE = 'RECEIVE_EXPERIENCE_DETAILS';


export function getExperienceDetails(id) {
    return { type: FETCH_EXPERIENCE_DETAILS_BEGIN, id };
}

export const fetchExperienceDetailsBegin = () => ({
    type: FETCH_EXPERIENCE_DETAILS_BEGIN,
});

export const fetchExperienceDetailsSuccess = experience => ({
    type: FETCH_EXPERIENCE_DETAILS_SUCCESS,
    payload: { experience },
});

export const fetchExperienceDetailsFailure = error => ({
    type: FETCH_EXPERIENCE_DETAILS_FAILURE,
    payload: { error },
});
