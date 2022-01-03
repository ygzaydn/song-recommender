import * as Actions from "../actionTypes/actionTypes";
import * as ArtistActions from "../actions/artistActions";

const artistReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.RECOMMEND_ARTIST: {
            return ArtistActions.applyRecommendArtist(state, action);
        }
        case Actions.GET_ARTIST: {
            return ArtistActions.applyGetArtist(state, action);
        }
        case Actions.GET_TOP_ALBUMS: {
            return ArtistActions.applyGetTopAlbums(state, action);
        }
        case Actions.GET_TOP_TRACKS: {
            return ArtistActions.applyGetTopTracks(state, action);
        }
        case Actions.RESET_ARTIST_STATE: {
            return ArtistActions.applyResetArtistState(state, action);
        }
        default:
            return state;
    }
};

export default artistReducer;
