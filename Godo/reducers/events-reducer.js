import { FETCH_ALL_EVENTS } from "../constants/action-types";

const initalState = {
  events: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_ALL_EVENTS:
      return {
        ...state,
        events: action.events
      };
    default:
      return state;
  }
};
