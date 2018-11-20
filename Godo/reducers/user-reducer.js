import * as actionTypes from "../constants/action-types";

const initalState = {
  events: [],
  term: null,
  isSearching: false,
  authErr: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_EVENTS:
      const events = action.payload;
      return {
        ...state,
        events
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
      console.log('sign up successfully');
      return {
         ...state,
         authErr: null
      };
    case actionTypes.USER_SIGNUP_ERROR:
      console.log('sign up error');
      return {
        state,
        authErr: action.err.message
      }
    default:
      return state;
  }
};
