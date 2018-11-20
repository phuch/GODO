import * as actionTypes from "../constants/action-types";
import events from "../fixtures/events.json";
import firebase from "../Firebase";

export const fetchUsersEvents = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_USERS_EVENTS,
      payload: events
    });
  };
};

export const userSignUp = (newUser) => {
    return async dispatch => {
        try {
            const signupResponse = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            await firebase.firestore().collection('users').doc(signupResponse.user.uid).set({
                fullName: newUser.fullName
            });
            dispatch({
                type: actionTypes.USER_SIGNUP_SUCCESS
            })
        } catch(err) {
            dispatch({type: actionTypes.USER_SIGNUP_ERROR,err})
        }
    }
}
