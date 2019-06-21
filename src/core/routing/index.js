import { createGate } from "effector-react";

export const RouteGate = createGate();

RouteGate.state.watch(({ path }) => {
  if (path) {
    console.log(path);
  }
});
