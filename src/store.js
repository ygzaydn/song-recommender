import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger'

//action types
const RECOMMEND_SONG = 'RECOMMEND_SONG';
const GET_TRACK = 'GET_TRACK'
const RECOMMEND_ARTIST = 'RECOMMEND_ARTIST'
const GET_ARTIST = 'GET_ARTIST'
const STATE_CHANGE = 'STATE_CHANGE'
const GET_TOP_ALBUMS = 'GET_TOP_ALBUMS'
const GET_TOP_TRACKS = 'GET_TOP_TRACKS';

//reducers
const recommendSongReducer = (state = [], action) => {
    switch(action.type) {
        case RECOMMEND_SONG: {
            return applyRecommendSong(state, action)
        }
        default: return state
    }
}

const trackInfoReducer = (state = [], action) => {
    switch(action.type) {
        case GET_TRACK: {
            return applyGetTrack(state, action)
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
const applyRecommendSong = (state, action) => {
    return  [...action.similartracks]
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

const applyGetTrack = (state, action) => {
    return {...state, getTrack: [...action.track]}
}

const applyRecommendArtist = (state, action) => {
    return {...state, getSimilar: [...action.similarartists]}
}

//action creators
const doRecommendSong = (similartracks) => {
    return {
        type: RECOMMEND_SONG,
        similartracks: similartracks.data.similarartists.artist
    }
}


const doGetArtist = (artist) => {
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

const doRecommendArtist = (similarartists) => {
    return {
        type: RECOMMEND_ARTIST,
        similarartists: similarartists.data.similarartists.artist
    }
}

const doGetTrack = (track) => {
    return {
        type: GET_TRACK,
        track
    }
}

const doSearchTracks = (track) => {
    return {
        type: GET_TRACK,
        track: track.data.results.trackmatches.track
    }
}

const doStateChange = (id) => {
    return {
        type: STATE_CHANGE,
        id
    }
}

//store initialization
const logger = createLogger();

const rootReducer = combineReducers({
    recommendSongState: recommendSongReducer,
    trackInfoState: trackInfoReducer,
    artistState: artistReducer,
    renderState: renderReducer
})
export const store = createStore(rootReducer, undefined, applyMiddleware(logger));

//React-redux functions
export const mapStateToProps = (state) => {
    return {
        recommendSongState: state.recommendSongState,
        trackInfoState: state.trackInfoState,
        artistState: state.artistState,
        renderState: state.renderState
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        onRecommendSong: similartracks => dispatch(doRecommendSong(similartracks)),
        onGetTrack: track => dispatch(doGetTrack(track)),
        onRecommendArtist: similarartists => dispatch(doRecommendArtist(similarartists)),
        onGetArtist: artist => dispatch(doGetArtist(artist)),
        onStateChange: id => dispatch(doStateChange(id)),
        onGetTopAlbums: artist => dispatch(doGetTopAlbums(artist)),
        onGetTopTracks: tracks => dispatch(doGetTopTracks(tracks)),
        onSearchTracks: tracks => dispatch(doSearchTracks(tracks))
    }
}