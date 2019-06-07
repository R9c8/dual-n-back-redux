import {
  createEvent,
  createStore,
  createStoreObject,
  createEffect,
} from "effector";

import merge from "lodash/merge";

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
  calcNumberOfTrials,
  calcNumberOfMatches,
  calcDuration,
  calcRate,
  soundLetters,
  initResults,
  saveResults,
} from "./utils";

export { formatTimeFromMs } from "./utils";

// Sounds setup

const sounds = soundLetters.reduce((acc, current) => {
  const obj = {};
  obj[current] = new Howl({
    src: [`sounds/${current}.ogg`, `sounds/${current}.mp3`],
  });
  return Object.assign(acc, obj);
}, {});

// Events and effects

export const startGame = createEvent("startGame");
const stopGame = createEvent("stopGame");
export const abortGame = createEvent("abortGame");

const positionMatchKeyPress = createEvent("positionMatchKeyPress");
const audioMatchKeyPress = createEvent("audioMatchKeyPress");
export const positionMatchButtonPress = createEvent("positionMatchButtonPress");
export const audioMatchButtonPress = createEvent("audioMatchButtonPress");

const setGameButtons = createEvent("setGameButtons");
const resetGameButtons = createEvent("resetGameButtons");

const addGameNotification = createEvent("addGameNotification");
const resetGameNotifications = createEvent("resetGameNotifications");

const showKeyPressEffect = createEffect("showKeyPressEffect").use(
  async (key) => {
    const obj = {};
    obj[key] = { showKeyPress: true };
    setGameButtons(obj);
    await sleep(100);
    obj[key] = { showKeyPress: false };
    setGameButtons(obj);
  },
);

export const setSettings = createEvent("setSettings");
const resetSettings = createEvent("resetSettings");
const saveSettingsEffect = createEffect("saveSettingsEffect").use(saveSettings);

export const setModeMatch = createEvent("setModeMatch");
export const setModeLevel = createEvent("setModeLevel");
const resetMode = createEvent("resetMode");
const saveModeEffect = createEffect("saveModeEffect").use(saveMode);

export const resetSettingsAndMode = createEvent("resetSettingsAndMode");

export const setVolume = createEvent("setVolume");
const saveVolumeEffect = createEffect("saveVolumeEffect").use(saveVolume);

export const showGameSquareElement = createEvent("showGameSquareElement");
export const resetGameSquare = createEvent("resetGameSquare");

const hideGameSquareElementEffect = createEffect("hideGameSquareElementEffect").use(
  async (time) => {
    await sleep(time);
    resetGameSquare();
  },
);

const addResult = createEvent();
const saveResultsEffect = createEffect("saveResultsEffect").use(saveResults);

const gameEffect = createEffect("gameEffect").use(
  async ({ settings, gameMode, volume }) => {
    let isGameStopped = false;
    const stop = () => {
      isGameStopped = true;
      resetGameSquare();
      resetGameButtons();
      stopGame();
    };
    const unwatchAbortGame = abortGame.watch(() => {
      stop();
      unwatchAbortGame();
    });

    const startDate = Date.now();

    const gameLine = generateGameLine({ settings, gameMode });

    const numberOfTrials = calcNumberOfTrials(
      settings.trialsNumber,
      settings.trialsFactor,
      settings.trialsExponent,
      gameMode.level,
    );
    const numberOfMatches = calcNumberOfMatches(numberOfTrials);
    const resultErrors = { position: 0, audio: 0 }; // Last Set (total/errors): {}
    const showErrorTimeMs = 100;

    const resultLine = []; // [{position: true, sound: false}]
    let increment = 0;

    let positionMatchTriggered = false;
    let soundMatchTriggered = false;

    const unwatchPositionMatchKeyPress = positionMatchKeyPress.watch(
      () => {
        positionMatchTriggered = true;
        // eslint-disable-next-line no-use-before-define
        if (settings.feedbackOnKeyPress && !$gameButtons.getState().position.disabled) {
          showKeyPressEffect("position");
        }
        setGameButtons({ position: { disabled: true } });
      },
    );
    const unwatchAudioMatchKeyPress = audioMatchKeyPress.watch(
      () => {
        soundMatchTriggered = true;
        // eslint-disable-next-line no-use-before-define
        if (settings.feedbackOnKeyPress && !$gameButtons.getState().audio.disabled) {
          showKeyPressEffect("audio");
        }
        setGameButtons({ audio: { disabled: true } });
      },
    );
    const unwatchPositionMatchButtonPress = positionMatchButtonPress.watch(
      () => {
        positionMatchTriggered = true;
        setGameButtons({ position: { disabled: true } });
      },
    );
    const unwatchAudioMatchButtonPress = audioMatchButtonPress.watch(
      () => {
        soundMatchTriggered = true;
        setGameButtons({ audio: { disabled: true } });
      },
    );

    Howler.volume(volume / 100);

    if (!isGameStopped) {
      await sleep(1000);
    }

    while (!isGameStopped) {
      const signals = gameLine.shift();
      if (signals) {
        showGameSquareElement({ position: signals.sets.position });
        sounds[signals.sets.sound].play();

        if (settings.trialTimeMode === "static") {
          // eslint-disable-next-line no-await-in-loop
          await sleep(settings.trialTimeMs - showErrorTimeMs);
        } else if (settings.trialTimeMode === "dynamic") {
          // eslint-disable-next-line no-await-in-loop
          await sleep(settings.timeInitialMs + increment - showErrorTimeMs);
          increment += settings.timeIncrementMs;
        }
        const resultPosition = signals.matches.position === positionMatchTriggered;
        const resultAudio = signals.matches.sound === soundMatchTriggered;
        positionMatchTriggered = false;
        soundMatchTriggered = false;
        if (!resultPosition) {
          // eslint-disable-next-line operator-assignment
          resultErrors.position = resultErrors.position + 1;
          if (settings.feedbackOnError) {
            setGameButtons({ position: { showError: true } });
          }
        }
        if (!resultAudio) {
          // eslint-disable-next-line operator-assignment
          resultErrors.audio = resultErrors.audio + 1;
          if (settings.feedbackOnError) {
            setGameButtons({ audio: { showError: true } });
          }
        }
        resultLine.push({ position: resultPosition, audio: resultAudio });
        // eslint-disable-next-line no-await-in-loop
        await sleep(showErrorTimeMs);
        resetGameButtons();
      } else {
        unwatchAbortGame();
        unwatchPositionMatchKeyPress();
        unwatchAudioMatchKeyPress();
        unwatchPositionMatchButtonPress();
        unwatchAudioMatchButtonPress();
        stop();
      }
    }

    // Saving results

    const duration = calcDuration(
      settings.trialTimeMode,
      settings.trialTimeMs,
      settings.timeInitialMs,
      settings.timeIncrementMs,
      numberOfTrials,
    );

    const rate = calcRate(numberOfMatches, resultErrors);
    const isSuccess = rate >= settings.thresholdAdvance;
    const isFail = !isSuccess
      ? (rate < settings.thresholdFallback)
      : false;

    if (resultLine.length === numberOfTrials) {
      addResult({
        date: startDate,
        mode: {
          level: gameMode.level,
          match: { ...gameMode.match },
        },
        duration,
        numberOfTrials,
        numberOfMatches,
        resultErrors,
        rate,
        isSuccess,
        isFail,
      });

      if (isSuccess) {
        setModeLevel(gameMode.level + 1);
        resetGameNotifications();
        addGameNotification({ title: `Set Complete`, message: `Rate: ${rate}%` });
        addGameNotification({
          title: `N-Back Level Increased`,
          message: `New level is ${gameMode.level + 1}`,
          isSuccess: true,
        });
      } else if (isFail) {
        resetGameNotifications();
        addGameNotification({ title: `Set Complete`, message: `Rate: ${rate}%` });
        // eslint-disable-next-line no-use-before-define
        const gameResults = $gameResults.getState();
        const fallbackCount = settings.thresholdFallbackCount;
        if ((gameResults.length >= fallbackCount) && gameMode.level !== 1) {
          const gameResultsRev = gameResults.reverse();
          const lastResults = gameResultsRev.slice(0, fallbackCount);
          const [needToDecrease, _levelIgnored] = lastResults.reduce(
            (acc, result) => {
              const [flag, level] = acc;
              let newAcc;
              if ((flag)
                && (level === result.mode.level)
                && (result.isFail)) {
                newAcc = [true, level];
              } else {
                newAcc = [false, level];
              }
              return newAcc;
            }, [true, gameMode.level],
          );
          if (needToDecrease) {
            setModeLevel(gameMode.level - 1);
            addGameNotification({
              title: `N-Back Level Decreased`,
              message: `New level is ${gameMode.level - 1}`,
              isFail: true,
            });
          }
        }
      } else {
        resetGameNotifications();
        addGameNotification({ title: `Set Complete`, message: `Rate: ${rate}%` });
      }
    } else {
      resetGameNotifications();
      addGameNotification({ title: `Set Cancelled` });
    }

    // console.log(resultLine);
    // console.log(`numberOfMatches: ${numberOfMatches}`);
    // console.log(resultErrors);
  },
);

const setNextSetWidgetEffect = createEffect("setNextSetWidgetEffect").use(setNextSetWidget);

export const $isGameStarted = createStore(false)
  .on(startGame, () => true)
  .on(stopGame, () => false);

export const $settingsForm = createStore(initSettings())
  .on(setSettings, (settings, newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    saveSettingsEffect(updatedSettings);
    return updatedSettings;
  })
  .on(resetSettings, initSettings);

const $settings = $settingsForm.map(settingsForm => ({
  trialTimeMode: settingsForm.trialTimeMode,
  trialTimeMs: Number(settingsForm.trialTimeMs),
  timeInitialMs: Number(settingsForm.timeInitialMs),
  timeIncrementMs: Number(settingsForm.timeIncrementMs),
  trialsNumber: Number(settingsForm.trialsNumber),
  trialsFactor: Number(settingsForm.trialsFactor),
  trialsExponent: Number(settingsForm.trialsExponent),
  thresholdAdvance: Number(settingsForm.thresholdAdvance),
  thresholdFallback: Number(settingsForm.thresholdFallback),
  thresholdFallbackCount: Number(settingsForm.thresholdFallbackCount),
  feedbackOnError: true,
  feedbackOnKeyPress: true,
}));

$settings.watch(console.log);

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

export const $gameButtons = createStore({
  position: { disabled: false, showError: false, showKeyPress: false },
  audio: { disabled: false, showError: false, showKeyPress: false },
}).on(setGameButtons, (state, newKeys) => {
  const updated = merge({}, state, newKeys);
  return updated;
}).reset(resetGameButtons);

export const $gameResults = createStore(initResults())
  .on(addResult, (results, newResult) => {
    const updated = [...results, newResult];
    saveResultsEffect(updated);
    return updated;
  });

export const $gameNotifications = createStore([])
  .on(addGameNotification, (notifications, newNotification) => {
    if (notifications.length === 3) {
      notifications.shift();
    }
    const updated = [...notifications, newNotification];
    return updated;
  })
  .reset(resetGameNotifications);

// Combines

const $globalSettings = createStoreObject(
  {
    settings: $settings,
    gameMode: $gameMode,
    volume: $volume,
  },
)
  .on(startGame, (p) => { gameEffect(p); });

$globalSettings.watch((p) => { setNextSetWidgetEffect(p); });

resetSettingsAndMode.watch(() => {
  localStorage.removeItem("settings");
  localStorage.removeItem("mode");
  resetSettings();
  resetMode();
});

// Widgets

export const $nextSetWidget = createStore(null)
  .on(setNextSetWidgetEffect.done, (state, { result }) => result);

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
