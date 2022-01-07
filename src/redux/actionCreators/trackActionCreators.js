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
    getTrackFromSearchwithNameandArtist(track, artist)
        .then((res) => {
            if (res[0].data.error || res[1].data.error) {
                dispatch({ type: Actions.APPLY_ERROR });
                throw new Error("err");
            } else {
                dispatch(doGetRecommendedTrack(res[0]));
                dispatch(doGetSimilarTrack(res[1]));
            }
            dispatch({ type: Actions.CLEAR_ERROR });
            dispatch({ type: Actions.TOGGLE_LOADING });
        })
        .catch((err) => {
            dispatch({ type: Actions.APPLY_ERROR });
        });
};

export const searchTrackByMbid =
    (mbid, func = "") =>
    (dispatch) => {
        dispatch({ type: Actions.TOGGLE_LOADING });
        getTrackFromSearch(mbid)
            .then((res) => {
                if (res[0].data.error || res[1].data.error) {
                    dispatch({ type: Actions.APPLY_ERROR });
                    throw new Error("err");
                } else {
                    dispatch(doGetRecommendedTrack(res[0]));
                    dispatch(doGetSimilarTrack(res[1]));
                }

                dispatch({ type: Actions.CLEAR_ERROR });
                dispatch({ type: Actions.TOGGLE_LOADING });
                if (typeof func === "function") {
                    func(`/track/${mbid}`);
                }
            })
            .catch((err) => {
                dispatch({ type: Actions.APPLY_ERROR });
            });
    };
