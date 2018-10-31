import * as actionTypes from "../constants/action-types";

const initalState = {
  events: [],
  term: null,
  isSearching: false
};

export default (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_EVENTS:
      const events = action.payload;
      return {
        ...state,
        events
      };
    default:
      return state;
  }
};
