import * as Actions from "../actionTypes/actionTypes";
import * as TrackActions from "../actions/trackActions";

const trackInfoReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.RECOMMEND_TRACK: {
            return TrackActions.applyRecommendTrack(state, action);
        }
        case Actions.GET_TRACK: {
            return TrackActions.applyGetTrack(state, action);
        }
        case Actions.GET_SIMILAR_TRACK: {
            return TrackActions.applyGetSimilarTrack(state, action);
        }
        case Actions.RESET_TRACK_STATE: {
            return TrackActions.applyResetTrackState(state, action);
        }
        default:
            return state;
    }
};

export default trackInfoReducer;
