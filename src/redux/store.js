import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import trackInfoReducer from "./reducers/trackReducer";
import artistReducer from "./reducers/artistReducer";
import tagReducer from "./reducers/tagReducer";
import geoReducer from "./reducers/geoReducer";

//store initialization
const logger = createLogger();

const rootReducer = combineReducers({
    trackInfoState: trackInfoReducer,
    artistState: artistReducer,
    tagState: tagReducer,
    geoState: geoReducer,
});
export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(...[logger, thunk])
);
