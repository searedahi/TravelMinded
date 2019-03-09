export const ADD_CTLI = 'INCREMENT_QUANTITY_CTLI';
export const REMOVE_CTLI = 'DECREMENT_QUANTITY_CTLI';

export function addCTLI(ctli) {
    return { type: ADD_CTLI, ctli };
}

export function removeCTLI(ctli) {
    return { type: REMOVE_CTLI, ctli };
}
