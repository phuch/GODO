import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import browseReducer from "./browse-reducer";
import homeReducer from "./home-reducer";
import userReducer from "./user-reducer";
import eventsReducer from "./events-reducer";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
    appState: appReducer,
    homeScreenState: homeReducer,
    browseScreenState: browseReducer,
    userState: userReducer,
    events: eventsReducer,
    firebase: firebaseReducer
});
