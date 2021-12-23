import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";

//action types

const RECOMMEND_ARTIST = "RECOMMEND_ARTIST";
const RECOMMEND_TRACK = "RECOMMEND_TRACK";

const STATE_CHANGE = "STATE_CHANGE";

const GET_TRACK = "GET_TRACK";
const GET_ARTIST = "GET_ARTIST";
const GET_TAG = "GET_TAG";

const GET_TOP_ALBUMS = "GET_TOP_ALBUMS";
const GET_TOP_TRACKS = "GET_TOP_TRACKS";
const GET_TOP_ALBUM_TAGS = "GET_TOP_ALBUM_TAGS";
const GET_TOP_ARTIST_TAGS = "GET_TOP_ARTIST_TAGS";
const GET_TOP_TRACK_TAGS = "GET_TOP_TRACK_TAGS";
const GET_TOP_TAGS = "GET_TOP_TAGS";

const GET_SIMILAR_TRACK = "GET_SIMILAR_TRACK";

const RESET_TRACK_STATE = "RESET_TRACK_STATE";
const RESET_ARTIST_STATE = "RESET_ARTIST_STATE";
const RESET_TAG_STATE = "RESET_TAG_STATE";
const RESET_GEO_STATE = "RESET_GEO_STATE";

const GET_GEO_TOP_ARTISTS = "GET_GEO_TOP_ARTISTS";
const GET_GEO_TOP_TRACKS = "GET_GEO_TOP_TRACKS";

//reducers

const trackInfoReducer = (state = [], action) => {
    switch (action.type) {
        case RECOMMEND_TRACK: {
            return applyRecommendTrack(state, action);
        }
        case GET_TRACK: {
            return applyGetTrack(state, action);
        }
        case GET_SIMILAR_TRACK: {
            return applyGetSimilarTrack(state, action);
        }
        case RESET_TRACK_STATE: {
            return applyResetTrackState(state, action);
        }
        default:
            return state;
    }
};

const artistReducer = (state = [], action) => {
    switch (action.type) {
        case RECOMMEND_ARTIST: {
            return applyRecommendArtist(state, action);
        }
        case GET_ARTIST: {
            return applyGetArtist(state, action);
        }
        case GET_TOP_ALBUMS: {
            return applyGetTopAlbums(state, action);
        }
        case GET_TOP_TRACKS: {
            return applyGetTopTracks(state, action);
        }
        case RESET_ARTIST_STATE: {
            return applyResetArtistState(state, action);
        }
        default:
            return state;
    }
};

const renderReducer = (state = "", action) => {
    switch (action.type) {
        case STATE_CHANGE: {
            return action.id;
        }
        default:
            return state;
    }
};

const tagReducer = (state = [], action) => {
    switch (action.type) {
        case GET_TAG: {
            return applyGetTag(state, action);
        }
        case GET_TOP_ALBUM_TAGS: {
            return applyGetTopAlbumTags(state, action);
        }
        case GET_TOP_ARTIST_TAGS: {
            return applyGetTopArtistTags(state, action);
        }
        case GET_TOP_TRACK_TAGS: {
            return applyGetTopTrackTags(state, action);
        }
        case RESET_TAG_STATE: {
            return applyResetTagState(state, action);
        }
        case GET_TOP_TAGS: {
            return applyGetTopTags(state, action);
        }
        default:
            return state;
    }
};

const geoReducer = (state = [], action) => {
    switch (action.type) {
        case GET_GEO_TOP_ARTISTS: {
            return applyGetGeoTopArtists(state, action);
        }
        case GET_GEO_TOP_TRACKS: {
            return applyGetGetoTopTracks(state, action);
        }
        case RESET_GEO_STATE: {
            return applyResetGeoState(state, action);
        }
        default:
            return state;
    }
};
//actions
//artistState actions
const applyRecommendArtist = (state, action) => {
    return { ...state, getSimilar: [...action.similarartists] };
};
const applyGetArtist = (state, action) => {
    return { ...state, getArtist: { ...action.artist } };
};

const applyGetTopAlbums = (state, action) => {
    return { ...state, getTopAlbums: { ...action.artist } };
};

const applyGetTopTracks = (state, action) => {
    return { ...state, getTopTracks: { ...action.tracks } };
};

const applyResetArtistState = (state, action) => {
    return [];
};

//trackState actions
const applyRecommendTrack = (state, action) => {
    return { ...state, getRecommendedTrack: [...action.track] };
};

const applyGetTrack = (state, action) => {
    return { ...state, getTrack: { ...action.track } };
};

const applyGetSimilarTrack = (state, action) => {
    return { ...state, getSimilarTrack: [...action.track] };
};
const applyResetTrackState = (state, action) => {
    return [];
};

//tagState actions
const applyGetTag = (state, action) => {
    return { ...state, getTag: { ...action.tag } };
};

const applyGetTopAlbumTags = (state, action) => {
    return { ...state, getTopAlbumTags: [...action.tag] };
};

const applyGetTopArtistTags = (state, action) => {
    return { ...state, getTopArtistTags: [...action.tag] };
};

const applyGetTopTrackTags = (state, action) => {
    return { ...state, getTopTrackTags: [...action.tag] };
};

const applyGetTopTags = (state, action) => {
    return { ...state, getTopTags: [...action.tag] };
};

const applyResetTagState = (state, action) => {
    return [];
};

//geoState actions
const applyGetGeoTopArtists = (state, action) => {
    return { ...state, getGeoTopArtists: [...action.geo] };
};

const applyGetGetoTopTracks = (state, action) => {
    return { ...state, getGeoTopTracks: [...action.geo] };
};

const applyResetGeoState = (state, action) => {
    return [];
};

//action creators
//artistState action creators
const doRecommendArtist = (similarartists) => {
    return {
        type: RECOMMEND_ARTIST,
        similarartists: similarartists.data.similarartists
            ? similarartists.data.similarartists.artist
            : {},
    };
};
const doGetRecommendedArtist = (artist) => {
    return {
        type: GET_ARTIST,
        artist: artist.data.artist,
    };
};
const doGetTopAlbums = (artist) => {
    return {
        type: GET_TOP_ALBUMS,
        artist: artist.data.topalbums,
    };
};
const doGetTopTracks = (tracks) => {
    return {
        type: GET_TOP_TRACKS,
        tracks: tracks.data.toptracks,
    };
};

const doResetArtistState = () => {
    return {
        type: RESET_ARTIST_STATE,
    };
};

//trackState action creators
const doGetRecommendedTrack = (track) => {
    return {
        type: GET_TRACK,
        track: track.data.track,
    };
};
const doRecommendTrack = (track) => {
    return {
        type: RECOMMEND_TRACK,
        track: track.data.similartracks.track,
    };
};

const doGetSimilarTrack = (track) => {
    return {
        type: GET_SIMILAR_TRACK,
        track: track.data.similartracks.track,
    };
};

const doResetTrackState = () => {
    return {
        type: RESET_GEO_STATE,
    };
};

//tagState action creators
const doGetTag = (tag) => {
    return {
        type: GET_TAG,
        tag: tag.data.tag,
    };
};

const doGetTopAlbumTags = (tag) => {
    return {
        type: GET_TOP_ALBUM_TAGS,
        tag: tag.data.albums.album,
    };
};

const doGetTopArtistTags = (tag) => {
    return {
        type: GET_TOP_ARTIST_TAGS,
        tag: tag.data.topartists.artist,
    };
};

const doGetTopTrackTags = (tag) => {
    return {
        type: GET_TOP_TRACK_TAGS,
        tag: tag.data.tracks.track,
    };
};

const doGetTopTags = (tag) => {
    return {
        type: GET_TOP_TAGS,
        tag: tag.data.toptags.tag,
    };
};

const doResetTagState = () => {
    return {
        type: RESET_TAG_STATE,
    };
};

//artistState action creators

const doGetGeoTopArtists = (geo) => {
    return {
        type: GET_GEO_TOP_ARTISTS,
        geo: geo.data.topartists.artist,
    };
};

const doGetGeoTopTracks = (geo) => {
    return {
        type: GET_GEO_TOP_TRACKS,
        geo: geo.data.tracks.track,
    };
};

const doResetGeoState = () => {
    return {
        type: RESET_GEO_STATE,
    };
};
//renderState action creators
const doStateChange = (id) => {
    return {
        type: STATE_CHANGE,
        id,
    };
};

//store initialization
const logger = createLogger();

const rootReducer = combineReducers({
    trackInfoState: trackInfoReducer,
    artistState: artistReducer,
    renderState: renderReducer,
    tagState: tagReducer,
    geoState: geoReducer,
});
export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(logger)
);

//React-redux functions
export const mapStateToProps = (state) => {
    return {
        trackInfoState: state.trackInfoState,
        artistState: state.artistState,
        renderState: state.renderState,
        tagState: state.tagState,
        geoState: state.geoState,
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onRecommendArtist: (similarartists) =>
            dispatch(doRecommendArtist(similarartists)),
        onRecommendTrack: (tracks) => dispatch(doRecommendTrack(tracks)),

        onGetArtist: (artist) => dispatch(doGetRecommendedArtist(artist)),
        onGetTrack: (track) => dispatch(doGetRecommendedTrack(track)),
        onGetTag: (tag) => dispatch(doGetTag(tag)),

        onStateChange: (id) => dispatch(doStateChange(id)),

        onGetTopAlbums: (artist) => dispatch(doGetTopAlbums(artist)),
        onGetTopTracks: (tracks) => dispatch(doGetTopTracks(tracks)),
        onGetTopAlbumsTag: (tag) => dispatch(doGetTopAlbumTags(tag)),
        onGetTopArtistTag: (tag) => dispatch(doGetTopArtistTags(tag)),
        onGetTopTracksTag: (tag) => dispatch(doGetTopTrackTags(tag)),
        onGetTopTags: (tag) => dispatch(doGetTopTags(tag)),

        onGetSimilarTrack: (tracks) => dispatch(doGetSimilarTrack(tracks)),

        onGetGeoTopArtists: (geo) => dispatch(doGetGeoTopArtists(geo)),
        onGetGeoTopTracks: (geo) => dispatch(doGetGeoTopTracks(geo)),

        onResetTrackState: () => dispatch(doResetTrackState()),
        onResetArtistState: () => dispatch(doResetArtistState()),
        onResetTagState: () => dispatch(doResetTagState()),
        onResetGeoState: () => dispatch(doResetGeoState()),
    };
};
