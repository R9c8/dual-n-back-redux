import {
  createEvent,
  createStore,
  createStoreObject,
  createEffect,
} from "effector";

import {
  sleep,
  setNextSetWidget,
  initSettings,
  saveSettings,
  initMode,
  saveMode,
  initVolume,
  saveVolume,
  generateGameLine,
} from "./util";

export const startGame = createEvent();
export const stopGame = createEvent();
export const abortGame = createEvent();

export const positionMatchPress = createEvent();
export const audioMatchPress = createEvent();

export const setSettings = createEvent();
const resetSettings = createEvent();
const saveSettingsEffect = createEffect('saveSettings').use(saveSettings);

export const setModeMatch = createEvent();
export const setModeLevel = createEvent();
const resetMode = createEvent();
const saveModeEffect = createEffect('saveMode').use(saveMode);

export const resetSettingsAndMode = createEvent();

export const setVolume = createEvent();
const saveVolumeEffect = createEffect('saveVolumeEffect').use(saveVolume);

export const showGameSquareElement = createEvent();
export const resetGameSquare = createEvent();

const hideGameSquareElementEffect = createEffect('hideGameSquareElementEffect').use(
  async (time) => {
    console.log('initGameSquare');
    await sleep(time);
    console.log('resetGameSquare');
    resetGameSquare();
  },
);

// const gamePromise = new Promise((resolve, reject) => {
//  abortGame.watch(reject);
//  console.log(123);
//  showGameSquareElement({ position: [1, 3] });
// });

const gameEffect = createEffect('game').use(
  async () => {
    const promise = new Promise((resolve, reject) => {
      abortGame.watch(reject);
      console.log(123);
      showGameSquareElement({ position: [1, 3] });
      showGameSquareElement({ position: [1, 2] });
      showGameSquareElement({ position: [3, 3] });
      showGameSquareElement({ position: [1, 1] });
      showGameSquareElement({ position: [1, 2] });
      showGameSquareElement({ position: [3, 3] });
    }).catch(() => {});
  },
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

export const $volume = createStore(initVolume())
  .on(setVolume, (oldVolume, newVolumeObj) => {
    const { volume } = newVolumeObj;
    saveVolumeEffect(volume);
    return volume;
  });

export const $gameSquare = createStore(null)
  .on(showGameSquareElement, (old, newState) => {
    console.log('showGameSquareElement');
    hideGameSquareElementEffect(700);
    return newState;
  })
  .reset(resetGameSquare);

const $globalSettings = createStoreObject(
  {
    settings: $settings,
    gameMode: $gameMode,
    volume: $volume,
  },
)
  .on(startGame, (p) => { gameEffect(p); });

export const $nextSetWidget = createStore(null)
  .on(setNextSetWidgetEffect.done, (state, { result }) => result);

export const $todaysSetsWidget = createStore(null);
export const $todaysStatisticsWidget = createStore(null);

$globalSettings.watch((p) => { setNextSetWidgetEffect(p); });
// $globalSettings.watch(generateGameLine);

$gameSquare.watch(console.log);

resetSettingsAndMode.watch((forseUpdate) => {
  localStorage.removeItem("settings");
  localStorage.removeItem("mode");
  resetSettings();
  resetMode();
  forseUpdate();
});


const keyDown = (e) => {
  const { keyCode } = e;
  if (keyCode === 32) { // Space
    if (!$isGameStarted.getState()) {
      startGame();
    }
  } else if (keyCode === 27) { // Esc
    if ($isGameStarted.getState()) {
      abortGame();
    }
  } else if (keyCode === 65) { // A: Position Match
    if ($isGameStarted.getState()) {
      positionMatchPress();
    }
  } else if (keyCode === 76) { // L: Audio Match
    if ($isGameStarted.getState()) {
      audioMatchPress();
    }
  } else {
    // console.log(keyCode);
  }
};

document.addEventListener("keydown", keyDown, false);
