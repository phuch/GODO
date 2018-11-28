import {
  FETCH_ALL_EVENTS,
  LOADING_EVENTS,
  FETCH_NEARBY_EVENTS_ERROR,
  FETCH_NEARBY_EVENTS_SUCCESS
} from "../constants/action-types";
import moment from "moment";

const initalState = {
  events: [],
  errorEvents: [],
  nearbyEvents: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_ALL_EVENTS:
      return {
        ...state,
        events: action.events
      };
    case LOADING_EVENTS:
      return {
        ...state,
        loading: action.loading
      };
    case FETCH_NEARBY_EVENTS_ERROR:
      const error = state.errorEvents.splice();
      if (!error.includes(action.eventId)) {
        error.push(eventId);
      }
      return {
        ...state,
        errorEvents: error
      };
    case FETCH_NEARBY_EVENTS_SUCCESS:
      const activeEvents = action.events.filter(
        event => event.time > Date.now()
      );
      return {
        ...state,
        nearbyEvents: activeEvents
      };
    default:
      return state;
  }
};