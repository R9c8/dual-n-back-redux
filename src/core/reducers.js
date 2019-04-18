import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
//import { authReducer } from './auth';

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
//  auth: authReducer,
});
