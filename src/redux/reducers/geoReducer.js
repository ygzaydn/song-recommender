import * as Actions from "../actionTypes/actionTypes";
import * as GeoActions from "../actions/geoActions";

const geoReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.GET_GEO_TOP_ARTISTS: {
            return GeoActions.applyGetGeoTopArtists(state, action);
        }
        case Actions.GET_GEO_TOP_TRACKS: {
            return GeoActions.applyGetGetoTopTracks(state, action);
        }
        case Actions.RESET_GEO_STATE: {
            return GeoActions.applyResetGeoState(state, action);
        }
        case Actions.SET_GEO_NAME: {
            return { ...state, name: action.payload };
        }
        default:
            return state;
    }
};

export default geoReducer;
