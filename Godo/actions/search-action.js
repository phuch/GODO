import { SEARCH } from '../constants/action-types';

export const search = (term) => {
    return (dispatch) => {
        dispatch ({
            type: SEARCH,
            payload: term
        })
    }
}