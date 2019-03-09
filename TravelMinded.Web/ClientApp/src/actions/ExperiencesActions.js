export const REQUEST_EXPERIENCES_ALL_TYPE = 'REQUEST_EXPERIENCES_ALL';
export const RECEIEVE_EXPERIENCES_ALL_TYPE = 'RECEIEVE_EXPERIENCES_ALL';

export function loadAllExperiences() {
    dispatch({ type: REQUEST_EXPERIENCES_ALL_TYPE });

    const url = `api/Experience/All`;
    const response = fetch(url);
    const experiences = response.json();

    dispatch({ type: RECEIEVE_EXPERIENCES_ALL_TYPE, experiences });
}