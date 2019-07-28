import * as actionTypes from "../constants/action-types";

const initalState = {
  events: [],
  term: null,
  isSearching: false,
  message: null,
  isLoading: false,
  currentUser: null
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
      return {
        ...state,
        isLoading: false,
        message: null,
      };
    case actionTypes.USER_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.err.message
      }
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: null
      }
    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        message: 'Login failed. Please check your credentials'
      }
      case actionTypes.USER_SIGNOUT:
      return {
          ...state,
          isLoading: false
      }
    case actionTypes.AUTH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.USER_AUTHENTICATED:
      return {
          ...state,
          currentUser: action.user
      }
    case actionTypes.USER_NOT_AUTHENTICATED:
      return {
          ...state,
          currentUser: null
      }
    default:
      return state;
  }
};
