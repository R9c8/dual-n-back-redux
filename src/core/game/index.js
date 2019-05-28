import {
  createEvent,
  createStore,
  createStoreObject,
  createEffect,
} from "effector";

import {
  setNextSetWidget,
  initSettings,
  saveSettings,
  initMode,
  saveMode,
  generateGameLine,
} from "./util";

// Tasks: add save all to localStorage

export const startGame = createEvent();
export const stopGame = createEvent();
export const abortGame = createEvent();

export const setSettings = createEvent();
const resetSettings = createEvent();
const saveSettingsEffect = createEffect('saveSettings').use(saveSettings);

export const setModeMatch = createEvent();
export const setModeLevel = createEvent();
const resetMode = createEvent();
const saveModeEffect = createEffect('saveMode').use(saveMode);

export const resetSettingsAndMode = createEvent();

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
  .on(setSettings, (settings, newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    saveSettingsEffect(updatedSettings);
    return updatedSettings;
  })
  .reset(resetSettings);

export const $gameMode = createStore(initMode())
  .on(setModeMatch, (mode, match) => {
    const updatedMode = { ...mode, match };
    saveModeEffect(updatedMode);
    return updatedMode;
  })
  .on(setModeLevel, (mode, level) => {
    const updatedMode = { ...mode, level };
    saveModeEffect(updatedMode);
    return updatedMode;
  })
  .reset(resetMode);

const $globalSettings = createStoreObject({ settings: $settings, gameMode: $gameMode })
  .on(startGame, (p) => { gameEffect(); });

export const $nextSetWidget = createStore(null)
  .on(setNextSetWidgetEffect.done, (state, { result }) => result);

export const $todaysSetsWidget = createStore(null);
export const $todaysStatisticsWidget = createStore(null);

$globalSettings.watch((p) => { setNextSetWidgetEffect(p); });
$globalSettings.watch(generateGameLine);

$nextSetWidget.watch(console.log);

resetSettingsAndMode.watch(() => {
  console.log("resetSettingsAndMode");
  localStorage.removeItem("settings");
  localStorage.removeItem("mode");
  resetSettings();
  resetMode();
});
