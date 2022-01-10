import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import trackInfoReducer from "./reducers/trackReducer";
import artistReducer from "./reducers/artistReducer";
import tagReducer from "./reducers/tagReducer";
import geoReducer from "./reducers/geoReducer";
import loadingReducer from "./reducers/loadingReducer";
import chartReducer from "./reducers/chartsReducer";
import albumReducer from "./reducers/albumReducer";

//store initialization
const logger = createLogger();

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
}

const rootReducer = combineReducers({
    trackInfoState: trackInfoReducer,
    artistState: artistReducer,
    tagState: tagReducer,
    geoState: geoReducer,
    loadingState: loadingReducer,
    chartState: chartReducer,
    albumState: albumReducer,
});
export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(...middlewares)
);
