import { combineReducers } from 'redux'
import appReducer from './app-reducer';
import eventReducer from './event-reducer';

export default combineReducers({
    appState: appReducer,
    events: eventReducer
})
