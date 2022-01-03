import * as Actions from "../actionTypes/actionTypes";
import { getGeoInfo } from "../../axiosCalls";

export const doGetGeoTopArtists = (geo) => {
    return {
        type: Actions.GET_GEO_TOP_ARTISTS,
        geo: geo.data.topartists.artist,
    };
};

export const doGetGeoTopTracks = (geo) => {
    return {
        type: Actions.GET_GEO_TOP_TRACKS,
        geo: geo.data.tracks.track,
    };
};

export const doResetGeoState = () => ({
    type: Actions.RESET_GEO_STATE,
});

export const searchGeo = (country) => (dispatch) => {
    dispatch(doResetGeoState());
    dispatch({ type: Actions.TOGGLE_LOADING });
    getGeoInfo(country).then((res) => {
        dispatch(doGetGeoTopTracks(res[0]));
        dispatch(doGetGeoTopArtists(res[1]));
        dispatch({ type: Actions.TOGGLE_LOADING });
    });
};
