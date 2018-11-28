import firebase from "../Firebase";
import {
  FETCH_ALL_EVENTS,
  LOADING_EVENTS,
  FETCH_NEARBY_EVENTS_SUCCESS,
  FETCH_NEARBY_EVENTS_ERROR,
  POST_EVENT_ERROR,
  POST_EVENT_SUCCESS
} from "../constants/action-types";
import { calculateDistance } from "../util/geolocationUtils";

const eventsDb = firebase.firestore().collection("events");
const locationsDb = firebase.firestore().collection("locations");

const _loadingEvents = loading => {
  return {
    type: LOADING_EVENTS,
    loading
  };
};

const _fetchNearbyEventsSuccess = events => {
  return {
    type: FETCH_NEARBY_EVENTS_SUCCESS,
    events
  };
};

const _createEventSuccess = newEvent => {
  return {
    type: POST_EVENT_SUCCESS,
    newEvent
  };
};

export const fetchAllEvents = () => async dispatch => {
  const events = [];
  const querySnapshot = await eventsDb.get();
  querySnapshot.forEach(async doc => {
    if (!doc.exists) return;

    const event = doc.data();
    const location = await locationsDb.doc(event.location.id).get();

    events.push({
      ...event,
      location: location.data()
    });

    if (events.length === querySnapshot.size) {
      dispatch({
        type: FETCH_ALL_EVENTS,
        events: events
      });
    }
  });
};

export const fetchNearbyEvents = location => async (dispatch, getState) => {
  const userLocation = location
    ? location
    : getState().homeScreenState.userLocation;
  const userLatitude = userLocation.coords.latitude;
  const userLongitude = userLocation.coords.longitude;

  dispatch(_loadingEvents(true));

  const querySnapshot = await eventsDb.get();
  const events = [];
  let count = 0;

  querySnapshot.forEach(async doc => {
    if (!doc.exists) {
      dispatch(_fetchNearbyEventsError(doc.id));
    } else {
      const event = doc.data();
      const location = await locationsDb.doc(event.location.id).get();

      const eventLatitude = location.data().coordinate.latitude;
      const eventLongitude = location.data().coordinate.longitude;

      if (
        calculateDistance(
          userLatitude,
          userLongitude,
          eventLatitude,
          eventLongitude,
          "K"
        ) <= 3
      ) {
        events.push({
          ...event,
          id: doc.id,
          location: {
            id: event.location.id,
            ...location.data()
          }
        });
      }

      count += 1;
      if (count === querySnapshot.size) {
        console.log(events);
        dispatch(_fetchNearbyEventsSuccess(events));
        dispatch(_loadingEvents(false));
      }
    }
  });
};

export const createEvent = event => {
  //dispatch(_loadingEvents(true));
  return (
    eventsDb
      .add({
        name: event.name,
        category: event.category,
        description: event.description,
        fee: event.fee,
        joined: 0,
        location: firebase.firestore().doc(event.location),
        publisher: "Piper",
        slots: event.slots,
        tags: event.tags,
        time: event.time
      })
      // .then(() => {
      //   dispatch(_loadingEvents(false));
      //   dispatch(_createEventSuccess(event));
      // })
      .catch(function(error) {
        //dispatch(_loadingEvents(false));
        console.error("Error adding document: ", error);
      })
  );
};