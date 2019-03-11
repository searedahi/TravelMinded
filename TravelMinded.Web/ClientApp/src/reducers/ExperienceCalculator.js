const incrementCountType = 'INCREMENT_COUNT';
const decrementCountType = 'DECREMENT_COUNT';
const initialState = { count: 0 };

export const actionCreators = {
  increment: () => ({ type: incrementCountType }),
  decrement: () => ({ type: decrementCountType }),
};

export const reducer = (state, action) => {
    const scopedState = state || initialState;

  if (action.type === incrementCountType) {
      return {
          ...scopedState,
          count: scopedState.count + 1,
      };
  }

  if (action.type === decrementCountType) {
      return {
          ...scopedState,
          count: scopedState.count - 1,
      };
  }

  return scopedState;
};
