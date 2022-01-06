import * as Actions from "../actionTypes/actionTypes";

import { getArtistInfoFromName } from "../../axiosCalls";

export const doRecommendArtist = (similarartists) => {
    return {
        type: Actions.RECOMMEND_ARTIST,
        similarartists: similarartists.data.similarartists
            ? similarartists.data.similarartists.artist
            : {},
    };
};
export const doGetRecommendedArtist = (artist) => {
    return {
        type: Actions.GET_ARTIST,
        artist: artist.data.artist,
    };
};
export const doGetTopAlbums = (artist) => {
    return {
        type: Actions.GET_TOP_ALBUMS,
        artist: artist.data.topalbums,
    };
};
export const doGetTopTracks = (tracks) => {
    return {
        type: Actions.GET_TOP_TRACKS,
        tracks: tracks.data.toptracks,
    };
};

export const doResetArtistState = () => {
    return {
        type: Actions.RESET_ARTIST_STATE,
    };
};

export const searchArtist =
    (name, func = "") =>
    (dispatch) => {
        dispatch({ type: Actions.TOGGLE_LOADING });
        getArtistInfoFromName(name).then((res) => {
            dispatch(doGetRecommendedArtist(res[0]));
            dispatch(doGetTopTracks(res[1]));
            dispatch(doGetTopAlbums(res[2]));
            dispatch({ type: Actions.TOGGLE_LOADING });
            if (typeof func === "function") {
                func(`/artist/${name}`);
            }
        });
    };
