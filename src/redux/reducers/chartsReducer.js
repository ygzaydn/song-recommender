import * as Actions from "../actionTypes/actionTypes";

const chartReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.CHART_GET_TOP_TRACKS: {
            return { ...state, topTracks: action.payload };
        }
        case Actions.CHART_GET_TOP_ARTISTS: {
            return { ...state, topArtists: action.payload };
        }
        case Actions.CHART_GET_TOP_TAGS: {
            return { ...state, topTags: action.payload };
        }
        case Actions.CHART_RESET: {
            return {};
        }
        default:
            return state;
    }
};

export default chartReducer;
