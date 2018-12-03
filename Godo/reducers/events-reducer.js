import {
  FETCH_ALL_EVENTS_SUCCESS,
  LOADING_EVENTS,
  FETCH_NEARBY_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  POST_EVENT_ERROR,
  POST_EVENT_SUCCESS,
  SEARCH_SUCCESS
} from "../constants/action-types";
import { calculateDistance } from "../util/geolocationUtils";
import moment from "moment";

const initalState = {
  events: [],
  errorEvents: [],
  nearbyEvents: [],
  searchResult: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events
      };
    case LOADING_EVENTS:
      return {
        ...state,
        loading: action.loading
      };
    case FETCH_EVENTS_ERROR:
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
        event => moment.unix(event.time.seconds) > Date.now()
      );
      return {
        ...state,
        nearbyEvents: activeEvents
      };
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.newEvent]
      };
    case POST_EVENT_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: action.result
      };
    default:
      return state;
  }
};
