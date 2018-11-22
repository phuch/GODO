import {
  GET_LOCATIONS,
  GET_LOCATIONS_ERROR,
  GET_LOCATIONS_LOADING,
  SEARCH_LOCATIONS_RESULT
} from "../constants/action-types";

const initialState = {
  locations: [],
  searchResult: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case GET_LOCATIONS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case GET_LOCATIONS_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case SEARCH_LOCATIONS_RESULT:
      return {
        ...state,
        searchResult: action.result
      };
    default:
      return state;
  }
};
