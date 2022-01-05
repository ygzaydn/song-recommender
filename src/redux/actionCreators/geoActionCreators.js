import * as Actions from "../actionTypes/actionTypes";
import { getGeoInfo } from "../../axiosCalls";
import { doResetTrackState } from "./trackActionCreators";
import { doResetArtistState } from "./artistActionCreators";
import { doResetTagState } from "./tagActionCreators";

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
    dispatch({ type: Actions.TOGGLE_LOADING });
    getGeoInfo(country).then((res) => {
        dispatch(doResetTrackState());
        dispatch(doResetArtistState());
        dispatch(doResetTagState());
        dispatch(doGetGeoTopTracks(res[0]));
        dispatch(doGetGeoTopArtists(res[1]));
        dispatch({ type: Actions.SET_GEO_NAME, payload: country });
        dispatch({ type: Actions.TOGGLE_LOADING });
    });
};
