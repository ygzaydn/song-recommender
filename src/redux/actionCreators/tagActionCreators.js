import * as Actions from "../actionTypes/actionTypes";

export const doGetTag = (tag) => {
    return {
        type: Actions.GET_TAG,
        tag: tag.data.tag,
    };
};

export const doGetTopAlbumTags = (tag) => {
    return {
        type: Actions.GET_TOP_ALBUM_TAGS,
        tag: tag.data.albums.album,
    };
};

export const doGetTopArtistTags = (tag) => {
    return {
        type: Actions.GET_TOP_ARTIST_TAGS,
        tag: tag.data.topartists.artist,
    };
};

export const doGetTopTrackTags = (tag) => {
    return {
        type: Actions.GET_TOP_TRACK_TAGS,
        tag: tag.data.tracks.track,
    };
};

export const doGetTopTags = (tag) => {
    return {
        type: Actions.GET_TOP_TAGS,
        tag: tag.data.toptags.tag,
    };
};

export const doResetTagState = () => {
    return {
        type: Actions.RESET_TAG_STATE,
    };
};
