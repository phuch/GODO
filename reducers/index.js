import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import browseReducer from "./browse-reducer";
import userReducer from "./user-reducer";
import eventsReducer from "./events-reducer";
import { firebaseReducer } from "react-redux-firebase";
import locationReducer from "./location-reducer";

export default combineReducers({
  appState: appReducer,
  browseScreenState: browseReducer,
  userState: userReducer,
  events: eventsReducer,
  location: locationReducer,
  firebase: firebaseReducer
});
