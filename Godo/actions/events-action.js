import firebase from "../Firebase";
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

const eventsDb = firebase.firestore().collection("events");
const locationsDb = firebase.firestore().collection("locations");
const usersDb = firebase.firestore().collection("users");

const _loadingEvents = loading => {
  return {
    type: LOADING_EVENTS,
    loading
  };
};

const _fetchAllEventsSuccess = events => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    events
  };
};

const _fetchNearbyEventsSuccess = events => {
  return {
    type: FETCH_NEARBY_EVENTS_SUCCESS,
    events
  };
};

const _fetchEventsError = id => {
  return {
    type: FETCH_EVENTS_ERROR,
    eventId: id
  };
};

const _createEventSuccess = newEvent => {
  return {
    type: POST_EVENT_SUCCESS,
    newEvent
  };
};

const _createEventError = error => {
  return {
    type: POST_EVENT_ERROR,
    error
  };
};

export const searchEvents = (term, options) => (dispatch, getState) => {
  const eventsArray = options.nearby
    ? getState().events.nearbyEvents
    : getState().events.events;

  const result = eventsArray.filter(event => {
    return (
      event.name.toLowerCase().includes(term.toLowerCase()) ||
      event.tags.includes(term.toLowerCase())
    );
  });

  dispatch({
    type: SEARCH_SUCCESS,
    result
  });
};

export const fetchAllEvents = () => async dispatch => {
  dispatch(_loadingEvents(true));

  const querySnapshot = await eventsDb.get();
  const userRef = await usersDb.doc(firebase.auth().currentUser.uid).get();
  const user = userRef.data();

  const events = [];

  querySnapshot.forEach(async doc => {
    if (!doc.exists) {
      dispatch(_fetchEventsError(doc.id));
    } else {
      const event = doc.data();
      const location = await locationsDb.doc(event.location.id).get();

      events.push({
        ...event,
        id: doc.id,
        location: {
          id: event.location.id,
          ...location.data()
        },
        publisher: user.fullName
      });
    }

    if (events.length === querySnapshot.size) {
      dispatch(_fetchAllEventsSuccess(events));
      dispatch(_loadingEvents(false));
    }
  });
};

export const fetchNearbyEvents = location => async (dispatch, getState) => {
  if (!location) return;
  const userLatitude = location.coords.latitude;
  const userLongitude = location.coords.longitude;

  dispatch(_loadingEvents(true));

  const querySnapshot = await eventsDb.get();
  const userRef = await usersDb.doc(firebase.auth().currentUser.uid).get();
  const user = userRef.data();

  const events = [];
  let count = 0;

  querySnapshot.forEach(async doc => {
    if (!doc.exists) {
      dispatch(_fetchEventsError(doc.id));
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
          },
          publisher: user.fullName
        });
      }

      count += 1;
      if (count === querySnapshot.size) {
        dispatch(_fetchNearbyEventsSuccess(events));
        dispatch(_loadingEvents(false));
      }
    }
  });
};

export const createEvent = event => async (dispatch, getState) => {
  const curentUserRef = await usersDb
    .doc(firebase.auth().currentUser.uid)
    .get();
  const user = curentUserRef.data();

  const userLatitude = getState().location.userLocation.coords.latitude;
  const userLongitude = getState().location.userLocation.coords.longitude;

  return eventsDb
    .add({
      name: event.name,
      category: event.category,
      description: event.description,
      fee: event.fee,
      joined: 0,
      location: firebase.firestore().doc(`/locations/${event.location.id}`),
      publisher: firebase
        .firestore()
        .doc(`/users/${firebase.auth().currentUser.uid}`),
      slots: event.slots,
      tags: event.tags,
      time: event.time,
      attendees: []
    })
    .then(docRef => {
      dispatch(_createEventSuccess(event));

      const newEvent = {
        ...event,
        time: { seconds: moment(event.time).unix() },
        joined: 0,
        publisher: user.fullName,
        id: docRef.id,
        attendees: []
      };

      if (
        calculateDistance(
          userLatitude,
          userLongitude,
          newEvent.location.coordinate.latitude,
          newEvent.location.coordinate.longitude,
          "K"
        ) <= 3
      ) {
        const nearbyEvents = getState().events.nearbyEvents.slice();
        nearbyEvents.unshift(newEvent);
        dispatch(_fetchNearbyEventsSuccess(nearbyEvents));
      }

      return newEvent;
    })
    .catch(function(error) {
      dispatch(_loadingEvents(false));
      dispatch(_createEventError(error));
      console.error("Error adding document: ", error);
    });
};
