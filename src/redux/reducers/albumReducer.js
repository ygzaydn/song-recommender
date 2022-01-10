import * as Actions from "../actionTypes/actionTypes";

const albumReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_ALBUM_INFO:
            return { ...state, album: action.payload.data.album };
        case Actions.RESET_ALBUM_STATE:
            return {};
        default:
            return state;
    }
};

export default albumReducer;
