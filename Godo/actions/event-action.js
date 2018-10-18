import { FETCH_ALL_EVENTS } from '../constants/action-types';
import events from '../fixtures/events.json';

export const fetchAllEvents = () => {
    return (dispatch) => {
        dispatch ({
            type: FETCH_ALL_EVENTS,
            payload: events
        })
    }
}