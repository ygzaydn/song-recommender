import { getCharts } from "../../axiosCalls";
import * as Actions from "../actionTypes/actionTypes";

export const getChartsThunk = () => (dispatch) => {
    dispatch({ type: Actions.TOGGLE_LOADING });
    getCharts().then((res) => {
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
        dispatch({ type: Actions.TOGGLE_LOADING });
    });
};
