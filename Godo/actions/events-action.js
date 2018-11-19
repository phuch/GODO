import firebase from "../Firebase";
import { FETCH_ALL_EVENTS } from "../constants/action-types";

const eventsDb = firebase.firestore().collection("events");
const locationsDb = firebase.firestore().collection("locations");

export const fetchAllEvents = () => async dispatch => {
  const events = [];
  const querrySnapshot = await eventsDb.get();
  querrySnapshot.forEach(async doc => {
    if (!doc.exists) return;

    const event = doc.data();
    const location = await locationsDb.doc(event.location.id).get();

    events.push({
      ...event,
      location: location.data()
    });

    if (events.length === querrySnapshot.size) {
      dispatch({
        type: FETCH_ALL_EVENTS,
        events: events
      });
    }
  });
};
