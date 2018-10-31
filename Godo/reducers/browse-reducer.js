import * as actionTypes from '../constants/action-types';
import allEvents from '../fixtures/events.json';

const initalState = {
    events: [],
    term: null,
    isSearching: false
}

export default (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_ALL:
            const term = action.payload;
            const results = allEvents.filter(event => event.name.toLowerCase().includes(term.toLowerCase())
            );
            const isSearching = term !== '';
            return {
                ...state,
                term,
                events: results,
                isSearching
            }
        case actionTypes.FETCH_ALL_EVENTS:
            const all = action.payload;
            return {
                ...state,
                events: all
            }
        default:
            return state
    }
}
