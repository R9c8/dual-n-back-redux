import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
// import { authReducer } from './auth';
// import { gameReducer as game } from "./game";

export const createRootReducer = history => (
  combineReducers({
    router: connectRouter(history),
    // game,
    // auth: authReducer,
  })
);
