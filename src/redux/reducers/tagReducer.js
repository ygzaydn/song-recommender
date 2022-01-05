import * as Actions from "../actionTypes/actionTypes";
import * as TagActions from "../actions/tagActions";

const tagReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.GET_TAG: {
            return TagActions.applyGetTag(state, action);
        }
        case Actions.GET_TOP_ALBUM_TAGS: {
            return TagActions.applyGetTopAlbumTags(state, action);
        }
        case Actions.GET_TOP_ARTIST_TAGS: {
            return TagActions.applyGetTopArtistTags(state, action);
        }
        case Actions.GET_TOP_TRACK_TAGS: {
            return TagActions.applyGetTopTrackTags(state, action);
        }
        case Actions.RESET_TAG_STATE: {
            return TagActions.applyResetTagState(state, action);
        }
        case Actions.GET_TOP_TAGS: {
            return TagActions.applyGetTopTags(state, action);
        }
        case Actions.SET_TAG_NAME: {
            return { ...state, name: action.payload };
        }
        default:
            return state;
    }
};

export default tagReducer;
