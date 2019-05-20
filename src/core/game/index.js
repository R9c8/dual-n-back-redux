import {
  createEvent,
  createStore,
  createStoreObject,
  createEffect,
} from "effector";

export const startGame = createEvent();
export const stopGame = createEvent();
export const abortGame = createEvent();

export const $isGameStarted = createStore(false)
  .on(startGame, () => true)
  .on(stopGame, () => false)
  .on(abortGame, () => false);

export const saveSettings = createEvent();

const initialSettings = {
  trialTimeMode: "static",
  trialTimeMs: "3000",
  timeInitialMs: "3000",
  timeIncrementMs: "100",
  trialsNumber: "20",
  trialsFactor: "1",
  trialsExponent: "2",
  thresholdAdvance: "80",
  thresholdFallback: "50",
  thresholdFallbackCount: "3",
  volume: 60,
  feedbackOnError: true,
  feedbackOnKeyPress: true,
};

export const $settings = createStore(initialSettings)
  .on(saveSettings, (settings, newSettings) => ({ ...settings, ...newSettings }));

export const setModeMatch = createEvent();
export const setModeLevel = createEvent();

const initialMode = {
  level: 2,
  match: {
    position: true,
    audio: true,
    number: false,
    color: false,
    shape: false,
  },
};

export const $gameMode = createStore(initialMode)
  .on(setModeMatch, (mode, match) => ({ ...mode, match }))
  .on(setModeLevel, (mode, level) => ({ ...mode, level }));

const calcDuration = (
  trialTimeMode,
  trialTimeMs,
  timeInitialMs,
  timeIncrementMs,
  numberOfTrials,
) => {
  let duration = 0;
  if (trialTimeMode === "static") {
    duration = numberOfTrials * trialTimeMs;
  } else if (trialTimeMode === "dynamic") {
    for (let i = 0; i < numberOfTrials; i += 1) {
      duration += timeInitialMs + timeIncrementMs * i;
    }
  }
  return duration;
};

const initNextSetWidget = async ({ settings, gameMode }) => {
  const numberOfTrials = Number(settings.trialsNumber)
    + ((gameMode.level * Number(settings.trialsFactor)) ** Number(settings.trialsExponent));

  const { trialTimeMode } = settings;
  const trialTimeMs = Number(settings.trialTimeMs);
  const timeInitialMs = Number(settings.timeInitialMs);
  const timeIncrementMs = Number(settings.timeIncrementMs);

  const trialTime = (trialTimeMode === "static") ? trialTimeMs : timeInitialMs;
  const trialTimeIncrement = (trialTimeMode === "static") ? 0 : timeIncrementMs;
  const duration = calcDuration(
    trialTimeMode,
    trialTimeMs,
    timeInitialMs,
    timeIncrementMs,
    numberOfTrials,
  );

  return {
    level: gameMode.level,
    numberOfTrials,
    trialTime,
    trialTimeIncrement,
    duration,
  };
};

const $globalSettings = createStoreObject({ settings: $settings, gameMode: $gameMode });

const setNextSetWidgetEffect = createEffect('initNextSetWidget').use(initNextSetWidget);

export const $nextSetWidget = createStore(null)
  .on(setNextSetWidgetEffect.done, (state, { result }) => result);

$globalSettings.watch((p) => { setNextSetWidgetEffect(p); });

$nextSetWidget.watch(console.log);
