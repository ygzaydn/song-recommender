import * as Actions from "../actionTypes/actionTypes";

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
        type: Actions.RESET_GEO_STATE,
    };
};
