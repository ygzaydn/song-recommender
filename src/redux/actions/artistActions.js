export const applyRecommendArtist = (state, action) => {
    return { ...state, getSimilar: [...action.similarartists] };
};
export const applyGetArtist = (state, action) => {
    return { ...state, getArtist: { ...action.artist } };
};

export const applyGetTopAlbums = (state, action) => {
    return { ...state, getTopAlbums: { ...action.artist } };
};

export const applyGetTopTracks = (state, action) => {
    return { ...state, getTopTracks: { ...action.tracks } };
};

export const applyResetArtistState = (state, action) => {
    return [];
};
