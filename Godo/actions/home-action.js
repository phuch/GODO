import {
  SEARCH_NEARBY,
  GET_LOCATION_ERROR,
  GET_LOCATION_SUCCESS,
  TOGGLE_SEARCH
} from "../constants/action-types";
import { Location, Permissions } from "expo";
import { calculateDistance } from "../util/geolocationUtils";
import events from "../fixtures/events.json";

export const getLocationAction = () => {
  return async dispatch => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch({
        type: GET_LOCATION_ERROR,
        errorMessage: "Permission to access location was denied"
      });
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    dispatch({
      type: GET_LOCATION_SUCCESS,
      userLocation
    });
  };
};

export const toggleSearchAction = () => {
  return {
    type: TOGGLE_SEARCH
  };
};

export const searchAction = term => {
  return dispatch => {
    dispatch({
      type: SEARCH_NEARBY,
      term
    });
  };
};

const getNearbyEvents = userLocation => {
  const userLatitude = userLocation.coords.latitude;
  const userLongitude = userLocation.coords.longitude;
  const nearbyEvents = events.filter(event => {
    const eventLatitude = event.location.coordinate.latitude;
    const eventLongitude = event.location.coordinate.longitude;
    return (
      calculateDistance(
        userLatitude,
        userLongitude,
        eventLatitude,
        eventLongitude,
        "K"
      ) <= 3
    );
  });
  return nearbyEvents;
};
