export const applyRecommendTrack = (state, action) => {
    return { ...state, getRecommendedTrack: [...action.track] };
};

export const applyGetTrack = (state, action) => {
    return { ...state, getTrack: { ...action.track } };
};

export const applyGetSimilarTrack = (state, action) => {
    return { ...state, getSimilarTrack: [...action.track] };
};
export const applyResetTrackState = (state, action) => {
    return [];
};
