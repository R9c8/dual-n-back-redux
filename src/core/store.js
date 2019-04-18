import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducer } from './reducers';
import { routerMiddleware } from 'connected-react-router';

export function configureStore({ history, initialState = {} }) {
  let middleware = compose(applyMiddleware(thunk), applyMiddleware(routerMiddleware(history)));

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history)),
        devToolsExtension()
      );
    }
  }

  const store = createStore(createRootReducer(history), middleware);

  return store;
}
