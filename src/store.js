import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger'

//action types
const RECOMMEND_SONG = 'RECOMMEND_SONG';
const GET_TRACK = 'GET_TRACK'

//reducers
const recommendSongReducer = (state = [], action) => {
    switch(action.type) {
        case RECOMMEND_SONG: {
            return  applyRecommendSong(state, action)
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

//actions
const applyRecommendSong = (state, action) => {
    return  {...action.similartracks}
}

const applyGetTrack = (state, action) => {
    return {...action.track}
}

//action creators
const doRecommendSong = (similartracks) => {
    return {
        type: RECOMMEND_SONG,
        similartracks: similartracks.data.similartracks.track
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
})
export const store = createStore(rootReducer, undefined, applyMiddleware(logger));

//React-redux functions
export const mapStateToProps = (state) => {
    return {
        recommendSongState: state.recommendSongState,
        songInfoState: state.songInfoState
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        onRecommendSong: similartracks => dispatch(doRecommendSong(similartracks)),
        onGetTrack: track => dispatch(doGetTrack(track)),
    }
}