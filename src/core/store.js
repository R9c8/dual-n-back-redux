/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import { createExecute as createExecue } from "redux-execute";
import { routerMiddleware } from "connected-react-router";

import { createRootReducer } from "./reducers";

export function configureStore({ history, initialState = {} }) {
  let middleware = compose(
    applyMiddleware(createExecue()),
    applyMiddleware(routerMiddleware(history)),
  );

  if (process.env.NODE_ENV !== "production") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === "function") {
      middleware = compose(
        applyMiddleware(
          createExecue({ log: true }),
          createLogger({ collapsed: true }),
        ),
        applyMiddleware(routerMiddleware(history)),
        devToolsExtension(),
      );
    }
  }

  const store = createStore(createRootReducer(history), middleware);

  return store;
}
