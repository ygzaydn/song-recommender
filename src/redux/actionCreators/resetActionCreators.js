import * as Actions from "../actionTypes/actionTypes";
import { doResetTagState } from "./tagActionCreators";
import { doResetArtistState } from "./artistActionCreators";
import { doResetGeoState } from "./geoActionCreators";
import { doResetTrackState } from "./trackActionCreators";

export const resetActions = (op) => (dispatch) => {
    const func = new Promise(() => {
        dispatch({ type: Actions.TOGGLE_LOADING });
        dispatch(doResetTagState());
        dispatch(doResetTrackState());
        dispatch(doResetArtistState());
        dispatch(doResetGeoState());
        dispatch({ type: Actions.TOGGLE_LOADING });
    });

    return func.then(() => op());
};
