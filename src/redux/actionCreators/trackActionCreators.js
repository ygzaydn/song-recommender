import * as Actions from "../actionTypes/actionTypes";
import {
    getTrackFromSearchwithNameandArtist,
    getTrackFromSearch,
} from "../../axiosCalls";

export const doGetRecommendedTrack = (track) => {
    return {
        type: Actions.GET_TRACK,
        track: track.data.track,
    };
};
export const doRecommendTrack = (track) => {
    return {
        type: Actions.RECOMMEND_TRACK,
        track: track.data.similartracks.track,
    };
};

export const doGetSimilarTrack = (track) => {
    return {
        type: Actions.GET_SIMILAR_TRACK,
        track: track.data.similartracks.track,
    };
};

export const doResetTrackState = () => {
    return {
        type: Actions.RESET_TRACK_STATE,
    };
};

export const searchTrack = (track, artist) => (dispatch) => {
    dispatch({ type: Actions.TOGGLE_LOADING });
    getTrackFromSearchwithNameandArtist(track, artist).then((res) => {
        dispatch(doGetRecommendedTrack(res[0]));
        dispatch(doGetSimilarTrack(res[1]));
        dispatch({ type: Actions.TOGGLE_LOADING });
    });
};

export const searchTrackByMbid =
    (mbid, func = "") =>
    (dispatch) => {
        dispatch({ type: Actions.TOGGLE_LOADING });
        getTrackFromSearch(mbid).then((res) => {
            dispatch(doGetRecommendedTrack(res[0]));
            dispatch(doGetSimilarTrack(res[1]));
            dispatch({ type: Actions.TOGGLE_LOADING });
            if (typeof func === "function") {
                func(`/track/${mbid}`);
            }
        });
    };
