import { createGate } from "effector-react";

import { gameInitRoute, gameTerminateRoute } from "../game";

export const RouteGate = createGate();

let prevPath;

RouteGate.state.watch(({ path }) => {
  if (path) {
    switch (prevPath) {
      case "/":
        gameTerminateRoute();
        break;
      default:
        break;
    }

    prevPath = path;

    switch (path) {
      case "/":
        gameInitRoute();
        break;
      default:
        break;
    }
  }
});
