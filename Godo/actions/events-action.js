import firebase from "../Firebase";
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

const _loadingParticipants = loading => {
  return {
    type: LOADING_PARTICIPANTS,
    loading
  };
};

const _getParticipantsSuccess = ({ id, participants }) => {
  return {
    type: GET_PARTICIPANTS_SUCCESS,
    id,
    participants
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
  const events = [];

  querySnapshot.forEach(async doc => {
    if (!doc.exists) {
      dispatch(_fetchEventsError(doc.id));
    } else {
      const event = doc.data();
      const location = await locationsDb.doc(event.location.id).get();
      const userRef = await usersDb.doc(event.publisher.id).get();
      const user = userRef.data();

      events.push({
        ...event,
        id: doc.id,
        location: {
          id: event.location.id,
          ...location.data()
        },
        publisher: {
          fullName: user.fullName,
          id: event.publisher.id
        }
      });
    }

    if (events.length === querySnapshot.size) {
      dispatch(_fetchAllEventsSuccess(events));
      dispatch(_loadingEvents(false));
    }
  });
};

export const fetchNearbyEvents = location => async dispatch => {
  if (!location) return;
  const userLatitude = location.coords.latitude;
  const userLongitude = location.coords.longitude;

  dispatch(_loadingEvents(true));

  const querySnapshot = await eventsDb.get();

  const events = [];
  let count = 0;

  querySnapshot.forEach(async doc => {
    if (!doc.exists) {
      dispatch(_fetchEventsError(doc.id));
    } else {
      const event = doc.data();
      const location = await locationsDb.doc(event.location.id).get();
      const userRef = await usersDb.doc(event.publisher.id).get();
      const user = userRef.data();

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
          publisher: {
            fullName: user.fullName,
            id: event.publisher.id
          }
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
      const newEvent = {
        ...event,
        time: { seconds: moment(event.time).unix() },
        publisher: {
          fullName: user.fullName,
          id: firebase.auth().currentUser.uid
        },
        id: docRef.id,
        attendees: []
      };

      dispatch(_createEventSuccess(newEvent));

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

export const listParticipants = event => dispatch => {
  if (!event) return;
  dispatch(_loadingParticipants(true));

  const participants = event.attendees.map(async participant => {
    const userRef = await usersDb.doc(participant.id).get();
    return userRef.data();
  });

  Promise.all(participants)
    .then(result => {
      dispatch(_loadingParticipants(false));
      dispatch(
        _getParticipantsSuccess({
          id: event.id,
          participants: result
        })
      );
    })
    .catch(err => err);
};

export const registerToEvent = event => dispatch => {
  if (!event) return;

  const curAttendees = event.attendees;
  const curUserId = firebase.auth().currentUser.uid;
  eventsDb
    .doc(event.id)
    .set(
      {
        attendees: [
          ...curAttendees,
          firebase.firestore().doc(`/users/${curUserId}`)
        ]
      },
      { merge: true }
    )
    .then(
      dispatch({
        type: REGISTER_SUCCESS,
        id: event.id,
        curUserId
      })
    );
};

export const unregisterToEvent = event => dispatch => {
  if (!event) return;

  const curUserId = firebase.auth().currentUser.uid;
  const newAttendees = event.attendees.filter(
    docRef => docRef.id !== curUserId
  );
  eventsDb
    .doc(event.id)
    .set(
      {
        attendees: newAttendees
      },
      { merge: true }
    )
    .then(
      dispatch({
        type: UNREGISTER_SUCCESS,
        id: event.id,
        curUserId
      })
    );
};
