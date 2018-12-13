import firebase from "../Firebase";
import {
  GET_LOCATIONS,
  GET_LOCATIONS_LOADING,
  GET_LOCATIONS_ERROR,
  SEARCH_LOCATIONS_RESULT,
  GET_CURRENT_LOCATION_ERROR,
  GET_CURRENT_LOCATION_SUCCESS,
  CREATE_LOCATION_SUCCESS
} from "../constants/action-types";
import { Location, Permissions } from "expo";

const locationsDb = firebase.firestore().collection("locations");

const _getLocationLoading = loading => {
  return {
    type: GET_LOCATIONS_LOADING,
    loading
  };
};

const _getLocationSuccess = locations => {
  return {
    type: GET_LOCATIONS,
    locations
  };
};

const _getLocationError = error => {
  return {
    type: GET_LOCATIONS_ERROR,
    error
  };
};

const _searchResult = result => {
  return {
    type: SEARCH_LOCATIONS_RESULT,
    result
  };
};

export const getCurrentLocation = () => {
  return async dispatch => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch({
        type: GET_CURRENT_LOCATION_ERROR,
        errorMessage: "Permission to access location was denied"
      });
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    dispatch({
      type: GET_CURRENT_LOCATION_SUCCESS,
      userLocation
    });
  };
};

export const getLocations = () => async dispatch => {
  const locations = [];
  dispatch(_getLocationLoading(true));
  try {
    const querySnapshot = await locationsDb.get();
    querySnapshot.forEach(doc => {
      if (doc.exists) {
        const location = doc.data();

        locations.push({
          ...location,
          id: doc.id
        });

        if (locations.length === querySnapshot.size) {
          dispatch(_getLocationLoading(false));
          dispatch(_getLocationSuccess(locations));
        }
      }
    });
  } catch (err) {
    console.log(err);
    dispatch(_getLocationLoading(false));
    dispatch(_getLocationError(err));
  }
};

export const searchLocations = term => (dispatch, getState) => {
  const { locations } = getState().location;
  dispatch(_getLocationLoading(true));

  const result = locations.filter(location => {
    return location.name.includes(term) || location.address.includes(term);
  });

  dispatch(_getLocationLoading(false));
  dispatch(_searchResult(result));
};

export const createLocation = ({ name, address }) => (dispatch, getState) => {
  if (!name || !address) return;
  const locations = getState().location.locations;

  const userLatitude = getState().location.userLocation.coords.latitude;
  const userLongitude = getState().location.userLocation.coords.longitude;
  let id;

  do {
    id = `loca:${Math.random()
      .toString(36)
      .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)}`;
  } while (locations.includes(id));

  return locationsDb
    .doc(id)
    .set({
      name: name,
      address: address,
      coordinate: new firebase.firestore.GeoPoint(userLatitude, userLongitude)
    })
    .then(() => {
      const newLoc = {
        name: name,
        address: address,
        coordinate: new firebase.firestore.GeoPoint(userLatitude, userLongitude)
      };
      dispatch({
        type: CREATE_LOCATION_SUCCESS,
        newLocation: newLoc
      });

      return newLoc;
    })
    .catch(err => console.log("Error create location", err));
};
