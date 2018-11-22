import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import browseReducer from "./browse-reducer";
import homeReducer from "./home-reducer";
import userReducer from "./user-reducer";
import eventsReducer from "./events-reducer";
import locationReducer from "./location-reducer";

export default combineReducers({
  appState: appReducer,
  homeScreenState: homeReducer,
  browseScreenState: browseReducer,
  userScreenState: userReducer,
  events: eventsReducer,
  location: locationReducer
});
