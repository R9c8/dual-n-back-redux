import {
  createEvent,
  createStore,
  createStoreObject,
  createEffect,
} from "effector";

import {
  setNextSetWidget,
  initSettings,
  initMode,
} from "./access";

export const startGame = createEvent();
export const stopGame = createEvent();
export const abortGame = createEvent();

export const saveSettings = createEvent();

export const setModeMatch = createEvent();
export const setModeLevel = createEvent();

const gamePromise = new Promise((resolve, reject) => {
  abortGame.watch(reject);
});

const gameEffect = createEffect('game').use(
  () => gamePromise.catch(() => {}),
);

const setNextSetWidgetEffect = createEffect('setNextSetWidget').use(setNextSetWidget);

export const $isGameStarted = createStore(false)
  .on(startGame, () => true)
  .on(abortGame, () => false);

export const $settings = createStore(initSettings())
  .on(saveSettings, (settings, newSettings) => ({ ...settings, ...newSettings }));

export const $gameMode = createStore(initMode())
  .on(setModeMatch, (mode, match) => ({ ...mode, match }))
  .on(setModeLevel, (mode, level) => ({ ...mode, level }));

const $globalSettings = createStoreObject({ settings: $settings, gameMode: $gameMode })
  .on(startGame, (p) => { gameEffect(); });

export const $nextSetWidget = createStore(null)
  .on(setNextSetWidgetEffect.done, (state, { result }) => result);

export const $todaysSetsWidget = createStore(null);
export const $todaysStatisticsWidget = createStore(null);

$globalSettings.watch((p) => { setNextSetWidgetEffect(p); });

$nextSetWidget.watch(console.log);
