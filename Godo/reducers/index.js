import { combineReducers } from 'redux'
import appReducer from './app-reducer';
import browseReducer from './browse-reducer';
import homeReducer from './home-reducer';

export default combineReducers({
    appState: appReducer,
    homeScreenState: homeReducer,
    browseScreenState: browseReducer
})
