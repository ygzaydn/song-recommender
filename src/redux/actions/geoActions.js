export const applyGetGeoTopArtists = (state, action) => {
    return { ...state, getGeoTopArtists: [...action.geo] };
};

export const applyGetGetoTopTracks = (state, action) => {
    return { ...state, getGeoTopTracks: [...action.geo] };
};

export const applyResetGeoState = (state, action) => {
    return [];
};
