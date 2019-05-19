import { createEvent, createStore, createStoreObject } from 'effector';

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
