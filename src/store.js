import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger'

//action types
const RECOMMEND_SONG = 'RECOMMEND_SONG';
const GET_TRACK = 'GET_TRACK'
const RECOMMEND_ARTIST = 'RECOMMEND_ARTIST'
const GET_ARTIST = 'GET_ARTIST'

//reducers
const recommendSongReducer = (state = [], action) => {
    switch(action.type) {
        case RECOMMEND_SONG: {
            return applyRecommendSong(state, action)
        }
        default: return state
    }
}

const songInfoStateReducer = (state = [], action) => {
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

const applyGetTrack = (state, action) => {
    return {...action.track}
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

//store initialization
const logger = createLogger();

const rootReducer = combineReducers({
    recommendSongState: recommendSongReducer,
    songInfoState: songInfoStateReducer,
    artistState: artistReducer
})
export const store = createStore(rootReducer, undefined, applyMiddleware(logger));

//React-redux functions
export const mapStateToProps = (state) => {
    return {
        recommendSongState: state.recommendSongState,
        songInfoState: state.songInfoState,
        artistState: state.artistState
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        onRecommendSong: similartracks => dispatch(doRecommendSong(similartracks)),
        onGetTrack: track => dispatch(doGetTrack(track)),
        onRecommendArtist: similarartists => dispatch(doRecommendArtist(similarartists)),
        onGetArtist: artist => dispatch(doGetArtist(artist))
    }
}