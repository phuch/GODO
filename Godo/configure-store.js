import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import firebase from "firebase";
import {reactReduxFirebase} from "react-redux-firebase";

export default () => createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        reactReduxFirebase(firebase, {useFirestoreForProfile: true, userProfile: 'users', enableRedirectHandling: false})
    )
)
