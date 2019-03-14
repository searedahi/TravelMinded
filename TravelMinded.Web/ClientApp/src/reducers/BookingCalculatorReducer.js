import {
    INCREMENT_CTLI,
    DECREMENT_CTLI,
} from '../actions/CustomerTypeLineItemActions';

const initialState = {
    bookingsList: [
        {
            experienceId: 0,
            customerPrototypes: {},
            experienceTix: [{
                tixList: [],
                tixTotal: 0,
                tixQty: 0,
            }],
        },
    ],
};

const bookingCalculator = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_CTLI:
            // find the index of object from array that needs an update
            const { bookingsList } = state;

            const experIdx = bookingsList.findIndex(exper => exper.experienceId === action.experienceId);

            if (experIdx === -1) {
                // APPEND A NEW BOOKING LIST ENTRY
                const newBookingList = [
                    ...state,
                    {
                        experienceId: action.experienceId,
                        customerPrototypes: {},
                        experienceTix: [{
                            tixList: [],
                            tixTotal: 0,
                            tixQty: 0,
                        }],
                    }];

                // CREATE A NEW TICKET
                const newTix = {
                    id: action.ctli.id,
                    ctli: action.ctli,
                    quantity: 1,
                    total: action.ctli.total,
                };

                // MERGE ANY EXISTING TIX
                const appendedList = [
                    ...state.tixList,
                    newTix,
                ];
                const incTotal = appendedList.reduce((a, b) => +a + b.total, 0);

                return {
                    ...state,
                    tixList: appendedList,
                    tixTotal: incTotal,
                    tixQty: incQty,
                };
            }

            const incIndex = state.tixList.findIndex(ticket => ticket.id === action.ctli.id);

            if (incIndex === -1) {
                // INSERT
                const newTix = {
                    id: action.ctli.id,
                    ctli: action.ctli,
                    quantity: 1,
                    total: action.ctli.total,
                };

                const incQty = state.tixQty += 1;
                const appendedList = [
                    ...state.tixList,
                    newTix,
                ];
                const incTotal = appendedList.reduce((a, b) => +a + b.total, 0);

                return {
                    ...state,
                    tixList: appendedList,
                    tixTotal: incTotal,
                    tixQty: incQty,
                };
            }

            // make new object of updated object.
            const incObj = {
                ...state.tixList[incIndex],
                quantity: state.tixList[incIndex].quantity += 1,
                total: action.ctli.total * (state.tixList[incIndex].quantity),
            };

            // make final new array of objects by combining updated object.
            const incTix = [
                ...state.tixList.slice(0, incIndex),
                incObj,
                ...state.tixList.slice(incIndex + 1),
            ];

            const incQty = state.tixQty += 1;
            const incTotal = incTix.reduce((a, b) => +a + b.total, 0);

            return {
                ...state,
                tixList: [
                    ...incTix,
                ],
                tixQty: incQty,
                tixTotal: incTotal,
            };

        case DECREMENT_CTLI:
            // find the index of object from array that needs an update
            let tixIndex = state.tixList.findIndex(ticket => ticket.id === action.ctli.id);

            // make new object of updated object.
            let updatedObj = {
                ...state.tixList[incIndex],
                quantity: state.tixList[incIndex].quantity -= 1,
            };

            // make final new array of objects by combining updated object.
            let updatedTix = [
                ...state.tixList.slice(0, tixIndex),
                updatedObj,
                ...state.tixList.slice(tixIndex + 1),
            ];

            let decQty = state.tixQty -= 1;
            let decTotal = updatedTix.reduce((a, b) => a.total + b.total, 0);

            return {
                ...state,
                tixList: [
                    ...updatedTix,
                ],
                tixQty: decQty,
                tixTotal: decTotal,
            };

        default:
            return state;
    }


};

export default bookingCalculator;
