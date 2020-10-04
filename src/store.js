import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger'

//action types

const RECOMMEND_ARTIST = 'RECOMMEND_ARTIST'
const RECOMMEND_TRACK = 'RECOMMEND_TRACK'

const STATE_CHANGE = 'STATE_CHANGE'

const GET_TRACK = 'GET_TRACK'
const GET_ARTIST = 'GET_ARTIST'
const GET_TOP_ALBUMS = 'GET_TOP_ALBUMS'
const GET_TOP_TRACKS = 'GET_TOP_TRACKS'

const GET_SIMILAR_TRACK= 'GET_SIMILAR_TRACK'


//reducers

const trackInfoReducer = (state = [], action) => {
    switch(action.type) {
        case RECOMMEND_TRACK: {
            return applyRecommendTrack(state, action)
        }
        case GET_TRACK: {
            return applyGetTrack(state, action)
        }
        case GET_SIMILAR_TRACK: {
            return applyGetSimilarTrack(state, action)
        }
        default: return state;
    }
}

const artistReducer = (state = [], action) => {
    switch (action.type) {
        case RECOMMEND_ARTIST: {
            return applyRecommendArtist(state,action)
        }
        case GET_ARTIST: {
            return applyGetArtist(state,action)
        }
        case GET_TOP_ALBUMS: {
            return applyGetTopAlbums(state,action)
        }
        case GET_TOP_TRACKS: {
            return applyGetTopTracks(state,action)
        }
        default: return state
    }
}

const renderReducer = (state = '', action) => {
    switch(action.type) {
        case STATE_CHANGE: {
            return action.id
        }
        default: return state
    }
}
//actions
    //artistState actions
const applyRecommendArtist = (state, action) => {
    return {...state, getSimilar: [...action.similarartists]}
}
const applyGetArtist = (state, action) => {
    return {...state, getArtist: {...action.artist}}
}

const applyGetTopAlbums = (state, action) => {
    return {...state, getTopAlbums: {...action.artist}}
}

const applyGetTopTracks = (state, action) => {
    return {...state, getTopTracks: {...action.tracks}}
}

    //trackState actions
const applyRecommendTrack = (state, action) => {
    return {...state, getRecommendedTrack: [...action.track]}
}

const applyGetTrack = (state, action) => {
    return {...state, getTrack: {...action.track}}
}

const applyGetSimilarTrack = (state, action) => {
    return {...state, getSimilarTrack: [...action.track]}
}

//action creators
    //artistState action creators
const doRecommendArtist = (similarartists) => {
    return {
        type: RECOMMEND_ARTIST,
        similarartists: similarartists.data.similarartists.artist
    }
}
const doGetRecommendedArtist = (artist) => {
    return {
        type: GET_ARTIST,
        artist: artist.data.artist
    }
}
const doGetTopAlbums = (artist) => {
    return {
        type: GET_TOP_ALBUMS,
        artist: artist.data.topalbums
    }
}
const doGetTopTracks = (tracks) => {
    return {
        type: GET_TOP_TRACKS,
        tracks: tracks.data.toptracks
    }
}

    //trackState action creators
const doGetRecommendedTrack = (track) => {
    return {
        type: GET_TRACK,
        track: track.data.track
    }
}
const doRecommendTrack = (track) => {
    return {
        type: RECOMMEND_TRACK,
        track: track.data.similartracks.track
    }
}

const doGetSimilarTrack = (track) => {
    return {
        type: GET_SIMILAR_TRACK,
        track: track.data.similartracks.track
    }
}
    //renderState action creators
const doStateChange = (id) => {
    return {
        type: STATE_CHANGE,
        id
    }
}

//store initialization
const logger = createLogger();

const rootReducer = combineReducers({
    trackInfoState: trackInfoReducer,
    artistState: artistReducer,
    renderState: renderReducer
})
export const store = createStore(rootReducer, undefined, applyMiddleware(logger));

//React-redux functions
export const mapStateToProps = (state) => {
    return {
        trackInfoState: state.trackInfoState,
        artistState: state.artistState,
        renderState: state.renderState
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        onRecommendArtist: similarartists => dispatch(doRecommendArtist(similarartists)),
        onRecommendTrack: tracks => dispatch(doRecommendTrack(tracks)),

        onGetArtist: artist => dispatch(doGetRecommendedArtist(artist)),
        onGetTrack: track => dispatch(doGetRecommendedTrack(track)),

        onStateChange: id => dispatch(doStateChange(id)),

        onGetTopAlbums: artist => dispatch(doGetTopAlbums(artist)),
        onGetTopTracks: tracks => dispatch(doGetTopTracks(tracks)),

        onGetSimilarTrack: tracks => dispatch(doGetSimilarTrack(tracks)),
    }
}