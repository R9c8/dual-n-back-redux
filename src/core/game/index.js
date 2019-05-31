import {
  createEvent,
  createStore,
  createStoreObject,
  createEffect,
} from "effector";

import { Howl, Howler } from 'howler';

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
  soundLetters,
} from "./utils";

// Sounds setup

const sounds = soundLetters.reduce((acc, current) => {
  const obj = {};
  obj[current] = new Howl({
    src: [`sounds/${current}.ogg`, `sounds/${current}.mp3`],
  });
  return Object.assign(acc, obj);
}, {});

// Events and effects

export const startGame = createEvent();
export const stopGame = createEvent();
export const abortGame = createEvent();

export const positionMatchKeyPress = createEvent();
export const audioMatchKeyPress = createEvent();
export const positionMatchButtonPress = createEvent();
export const audioMatchButtonPress = createEvent();

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
    await sleep(time);
    resetGameSquare();
  },
);

const gameEffect = createEffect('game').use(
  async ({ settings, gameMode, volume }) => {
    let isGameStopped = false;
    const stop = () => {
      isGameStopped = true;
      resetGameSquare();
      stopGame();
      console.log('game stopped');
    };
    const unwatchAbortGame = abortGame.watch(() => {
      stop();
      unwatchAbortGame();
    });

    const gameLine = generateGameLine({ settings, gameMode });
    const resultLine = []; // [{position: true, sound: false}]
    let increment = 0;

    let positionMatchTriggered = false;
    let soundMatchTriggered = false;

    const unwatchPositionMatchKeyPress = positionMatchKeyPress.watch(
      () => { positionMatchTriggered = true; },
    );
    const unwatchAudioMatchKeyPress = audioMatchKeyPress.watch(
      () => { soundMatchTriggered = true; },
    );
    const unwatchPositionMatchButtonPress = positionMatchButtonPress.watch(
      () => { positionMatchTriggered = true; },
    );
    const unwatchAudioMatchButtonPress = audioMatchButtonPress.watch(
      () => { soundMatchTriggered = true; },
    );

    Howler.volume(volume / 100);

    while (!isGameStopped) {
      const signals = gameLine.shift();
      if (signals) {
        showGameSquareElement({ position: signals.sets.position });
        sounds[signals.sets.sound].play();

        if (settings.trialTimeMode === "static") {
          // eslint-disable-next-line no-await-in-loop
          await sleep(Number(settings.trialTimeMs));
        } else if (settings.trialTimeMode === "dynamic") {
          // eslint-disable-next-line no-await-in-loop
          await sleep(Number(settings.timeInitialMs) + increment);
          increment += Number(settings.timeIncrementMs);
        }
        const resultPosition = signals.matches.position === positionMatchTriggered;
        const resultAudio = signals.matches.sound === soundMatchTriggered;
        positionMatchTriggered = false;
        soundMatchTriggered = false;
        resultLine.push({ position: resultPosition, audio: resultAudio });
      } else {
        unwatchAbortGame();
        unwatchPositionMatchKeyPress();
        unwatchAudioMatchKeyPress();
        unwatchPositionMatchButtonPress();
        unwatchAudioMatchButtonPress();
        stop();
      }
    }

    console.log(resultLine);
  },
);

const setNextSetWidgetEffect = createEffect('setNextSetWidget').use(setNextSetWidget);

export const $isGameStarted = createStore(false)
  .on(startGame, () => true)
  .on(stopGame, () => false);

export const $settings = createStore(initSettings())
  .on(setSettings, (settings, newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    saveSettingsEffect(updatedSettings);
    return updatedSettings;
  })
  .on(resetSettings, initSettings);

// Settings stores

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
  .on(resetMode, initMode);

export const $volume = createStore(initVolume())
  .on(setVolume, (oldVolume, newVolumeObj) => {
    const { volume } = newVolumeObj;
    saveVolumeEffect(volume);
    return volume;
  });

// Game stores

export const $gameSquare = createStore(null)
  .on(showGameSquareElement, (old, newState) => {
    hideGameSquareElementEffect(700);
    return newState;
  })
  .reset(resetGameSquare);

// Combines

const $globalSettings = createStoreObject(
  {
    settings: $settings,
    gameMode: $gameMode,
    volume: $volume,
  },
)
  .on(startGame, (p) => { gameEffect(p); });

// Widgets

export const $nextSetWidget = createStore(null)
  .on(setNextSetWidgetEffect.done, (state, { result }) => result);

export const $todaysSetsWidget = createStore(null);
export const $todaysStatisticsWidget = createStore(null);

$globalSettings.watch((p) => { setNextSetWidgetEffect(p); });

resetSettingsAndMode.watch((updateForm) => {
  localStorage.removeItem("settings");
  localStorage.removeItem("mode");
  resetSettings();
  resetMode();
  // const unwatch = $globalSettings.watch(() => { updateForm(); });
  // unwatch();
});

// Keydown listeners

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
      positionMatchKeyPress();
    }
  } else if (keyCode === 76) { // L: Audio Match
    if ($isGameStarted.getState()) {
      audioMatchKeyPress();
    }
  } else {
    // console.log(keyCode);
  }
};

document.addEventListener("keydown", keyDown, false);
