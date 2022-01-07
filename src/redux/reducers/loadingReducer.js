import * as Actions from "../actionTypes/actionTypes";
import { applyToggleLoadingState } from "../actions/loadingActions";

const loadingReducer = (state = { loading: false, error: false }, action) => {
    switch (action.type) {
        case Actions.TOGGLE_LOADING:
            return applyToggleLoadingState(state);
        case Actions.APPLY_ERROR:
            return { ...state, error: true };
        case Actions.CLEAR_ERROR:
            return { ...state, error: false };
        default:
            return state;
    }
};

export default loadingReducer;
