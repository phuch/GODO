import firebase from "../Firebase";
import {
  GET_LOCATIONS,
  GET_LOCATIONS_LOADING,
  GET_LOCATIONS_ERROR,
  SEARCH_LOCATIONS_RESULT
} from "../constants/action-types";

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
