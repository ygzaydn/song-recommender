import * as Actions from "../actionTypes/actionTypes";

export const doGetGeoTopArtists = (geo) => {
    return {
        type: Actions.GET_GEO_TOP_ARTISTS,
        geo: geo.data.topartists.artist,
    };
};

export const doGetGeoTopTracks = (geo) => {
    return {
        type: Actions.GET_GEO_TOP_TRACKS,
        geo: geo.data.tracks.track,
    };
};

export const doResetGeoState = () => ({
    type: Actions.RESET_GEO_STATE,
});
