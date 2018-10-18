import * as actionTypes from '../constants/action-types';

const initalState = {
    userLocation: null,
    nearbyEvents: null,
    searchResult: null,
    errorMessage: null,
    isSearching: false
}

export default (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOCATION_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case actionTypes.GET_LOCATION_SUCCESS:
            return {
                ...state,
                userLocation: action.userLocation,
                nearbyEvents: action.nearbyEvents
            }
        case actionTypes.TOGGLE_SEARCH:
            return {
                ...state,
                isSearching: !state.isSearching
            }
        case actionTypes.SEARCH_NEARBY:
            const term = action.term;
            const searchResult = state.nearbyEvents.filter(event => event.name.toLowerCase().includes(term.toLowerCase()));
            return {
                ...state,
                searchResult
            }
        default:
            return state
    }
}
