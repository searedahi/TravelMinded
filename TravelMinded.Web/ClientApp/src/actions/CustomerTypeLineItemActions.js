export const INCREMENT_CTLI = 'INCREMENT_QUANTITY_CTLI';
export const DECREMENT_CTLI = 'DECREMENT_QUANTITY_CTLI';

export function incrementCTLI(ctli) {
    return { type: INCREMENT_CTLI, ctli };
}

export function decrementCTLI(ctli) {
    return { type: DECREMENT_CTLI, ctli };
}
