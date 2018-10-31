import { FETCH_USERS_EVENTS } from "../constants/action-types";
import events from "../fixtures/events.json";

export const fetchUsersEvents = () => {
  return dispatch => {
    dispatch({
      type: FETCH_USERS_EVENTS,
      payload: events
    });
  };
};
