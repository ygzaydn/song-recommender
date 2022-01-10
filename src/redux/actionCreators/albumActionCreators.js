import { getAlbumByMbid } from "../../axiosCalls";
import * as Actions from "../actionTypes/actionTypes";

export const searchAlbum =
    (mbid, func = "") =>
    (dispatch) => {
        dispatch({ type: Actions.TOGGLE_LOADING });
        getAlbumByMbid(mbid).then((res) => {
            if (res && res.data && res.data.error) {
                dispatch({ type: Actions.APPLY_ERROR });
                throw new Error("err");
            }
            dispatch({ type: Actions.GET_ALBUM_INFO, payload: res });
            dispatch({ type: Actions.TOGGLE_LOADING });
            if (typeof func === "function") {
                func(`/album/${mbid}`);
            }
        });
    };
