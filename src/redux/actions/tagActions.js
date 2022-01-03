export const applyGetTag = (state, action) => {
    return { ...state, getTag: { ...action.tag } };
};

export const applyGetTopAlbumTags = (state, action) => {
    return { ...state, getTopAlbumTags: [...action.tag] };
};

export const applyGetTopArtistTags = (state, action) => {
    return { ...state, getTopArtistTags: [...action.tag] };
};

export const applyGetTopTrackTags = (state, action) => {
    return { ...state, getTopTrackTags: [...action.tag] };
};

export const applyGetTopTags = (state, action) => {
    return { ...state, getTopTags: [...action.tag] };
};

export const applyResetTagState = (state, action) => {
    return [];
};
