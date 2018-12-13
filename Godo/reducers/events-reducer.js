import {
  FETCH_ALL_EVENTS_SUCCESS,
  LOADING_EVENTS,
  FETCH_NEARBY_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  POST_EVENT_ERROR,
  POST_EVENT_SUCCESS,
  SEARCH_SUCCESS,
  LOADING_PARTICIPANTS,
  GET_PARTICIPANTS_SUCCESS,
  REGISTER_SUCCESS,
  UNREGISTER_SUCCESS
} from "../constants/action-types";
import { sortEvents } from "../util/sortingAlgorithm";
import moment from "moment";
import _ from "lodash";
import firebase from "../Firebase";

const initalState = {
  events: [],
  errorEvents: [],
  nearbyEvents: [],
  participants: [],
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
        nearbyEvents: sortEvents(activeEvents)
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
    case LOADING_PARTICIPANTS:
      return {
        ...state,
        loadingParticipants: action.loading
      };
    case GET_PARTICIPANTS_SUCCESS:
      const participantsList = state.participants.find(
        event => event.id === action.id
      );
      if (participantsList) {
        return {
          ...state,
          participants: state.participants.map(event => {
            if (event.id !== action.id) {
              return event;
            }
            return {
              ...event,
              participants: action.participants
            };
          })
        };
      } else {
        return {
          ...state,
          participants: [
            ...state.participants,
            ...[
              {
                id: action.id,
                participants: action.participants
              }
            ]
          ]
        };
      }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id !== action.id) {
            return event;
          }
          return {
            ...event,
            attendees: [
              ...event.attendees,
              firebase.firestore().doc(`/users/${action.curUserId}`)
            ]
          };
        })
      };
    }
    case UNREGISTER_SUCCESS: {
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id !== action.id) {
            return event;
          }
          const newAttendees = event.attendees.filter(
            ref => ref.id !== action.curUserId
          );
          return {
            ...event,
            attendees: newAttendees
          };
        })
      };
    }
    default:
      return state;
  }
};
