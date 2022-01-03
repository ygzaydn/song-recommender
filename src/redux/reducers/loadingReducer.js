import * as Actions from "../actionTypes/actionTypes";
import { applyToggleLoadingState } from "../actions/loadingActions";

const loadingReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case Actions.TOGGLE_LOADING:
            return applyToggleLoadingState(state);
        default:
            return state;
    }
};

export default loadingReducer;
