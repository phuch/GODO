import * as actionTypes from '../constants/action-types';
import allEvents from '../fixtures/events.json';

const initalState = {
    events: allEvents,
    isSearching: false
}

export default (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_ALL:
            const term = action.payload;
            const events = allEvents.filter(event => event.name.toLowerCase().includes(term.toLowerCase())
            );
            const isSearching = term !== '';
            return {
                ...state,
                events,
                isSearching
            }
        default:
            return state
    }
}
