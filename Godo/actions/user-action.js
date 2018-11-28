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

export const getCurrentUser = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(
                user => {
                    if (user) {
                        dispatch({
                            type: actionTypes.USER_AUTHENTICATED, user
                        });
                    } else {
                        dispatch({
                            type: actionTypes.USER_NOT_AUTHENTICATED
                        });
                    }
                    resolve(user)
                },
                error => reject(error)
            )
        })
    }
}

export const userSignUp = (newUser) => {
    return async dispatch => {
        dispatch ({
            type:  actionTypes.AUTH_REQUEST
        })
        try {
            const signupResponse = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            await firebase.firestore().collection('users').doc(signupResponse.user.uid).set({
                email: newUser.email,
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

export const userSignIn = (credentials) => {
    return async (dispatch) => {
        dispatch ({
            type:  actionTypes.AUTH_REQUEST
        })
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            dispatch({
                type: actionTypes.USER_LOGIN_SUCCESS
            })
        } catch(err) {
            dispatch({type: actionTypes.USER_LOGIN_ERROR,err})
        }
    }
}

export const userSignOut = () => {
    return async dispatch => {
        dispatch ({
            type:  actionTypes.AUTH_REQUEST
        })
        await firebase.auth().signOut();
        dispatch({
            type: actionTypes.USER_SIGNOUT
        })
    }
}


