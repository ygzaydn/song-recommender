import { getCharts } from "../../axiosCalls";
import * as Actions from "../actionTypes/actionTypes";

export const getChartsThunk = () => (dispatch) => {
    dispatch({ type: Actions.TOGGLE_LOADING });
    getCharts()
        .then((res) => {
            if (res[0].data.error || res[1].data.error || res[2].data.error) {
                dispatch({ type: Actions.APPLY_ERROR });
                throw new Error("err");
            } else {
                dispatch({
                    type: Actions.CHART_GET_TOP_ARTISTS,
                    payload: res[0].data.artists.artist,
                });
                dispatch({
                    type: Actions.CHART_GET_TOP_TAGS,
                    payload: res[1].data.tags.tag,
                });
                dispatch({
                    type: Actions.CHART_GET_TOP_TRACKS,
                    payload: res[2].data.tracks.track,
                });
            }

            dispatch({ type: Actions.TOGGLE_LOADING });
            dispatch({ type: Actions.CLEAR_ERROR });
        })
        .catch((err) => {
            dispatch({ type: Actions.APPLY_ERROR });
        });
};
