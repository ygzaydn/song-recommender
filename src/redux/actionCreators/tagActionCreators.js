import * as Actions from "../actionTypes/actionTypes";
import { getTagInfoFromName } from "../../axiosCalls";

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

export const searchTag = (tag) => (dispatch) => {
    dispatch(doResetTagState());
    dispatch({ type: Actions.TOGGLE_LOADING });
    getTagInfoFromName(tag).then((res) => {
        dispatch(doGetTag(res[0]));
        dispatch(doGetTopAlbumTags(res[1]));
        dispatch(doGetTopArtistTags(res[2]));
        dispatch(doGetTopTrackTags(res[3]));
        dispatch({ type: Actions.TOGGLE_LOADING });
    });
};
