import { SEARCH_ALL } from '../constants/action-types';

export const searchAllAction = (term) => {
    return (dispatch) => {
        dispatch ({
            type: SEARCH_ALL,
            payload: term
        })
    }
}
