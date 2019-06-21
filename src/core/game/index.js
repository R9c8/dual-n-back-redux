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
    html5: true,
  });
  return Object.assign(acc, obj);
}, {});

// Events and effects

export const startGame = createEvent();
const stopGame = createEvent();
export const abortGame = createEvent();
const startGameKeyPress = createEvent();
const abortGameKeyPress = createEvent();

const positionMatchKeyPress = createEvent();
const audioMatchKeyPress = createEvent();
export const positionMatchButtonPress = createEvent();
export const audioMatchButtonPress = createEvent();

const setGameButtons = createEvent();
const resetGameButtons = createEvent();

const addGameNotification = createEvent();
const resetGameNotifications = createEvent();

const showKeyPress = createEvent();
const showKeyPressEffect = createEffect().use(
  async (key) => {
    const obj = {};
    obj[key] = { showKeyPress: true };
    setGameButtons(obj);
    await sleep(100);
    obj[key] = { showKeyPress: false };
    setGameButtons(obj);
  },
);

export const setSettings = createEvent();
const resetSettings = createEvent();
const saveSettingsEffect = createEffect().use(saveSettings);

export const setModeMatch = createEvent();
export const setModeLevel = createEvent();
const resetMode = createEvent();
const saveModeEffect = createEffect().use(saveMode);

export const resetSettingsAndMode = createEvent();

export const setVolume = createEvent();
const saveVolumeEffect = createEffect().use(saveVolume);

export const showGameSquareElement = createEvent();
export const resetGameSquare = createEvent();

const hideGameSquareElementEffect = createEffect().use(
  async (time) => {
    await sleep(time);
    resetGameSquare();
  },
);

const addResult = createEvent();
const saveResultsEffect = createEffect().use(saveResults);

const gameEffect = createEffect().use(
  async ({
    settings,
    gameMode,
    volume,
    gameResults,
  }) => {
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
        if (settings.feedbackOnKeyPress) {
          showKeyPress("position");
        }
        setGameButtons({ position: { disabled: true } });
      },
    );

    const unwatchAudioMatchKeyPress = audioMatchKeyPress.watch(
      () => {
        soundMatchTriggered = true;
        // eslint-disable-next-line no-use-before-define
        if (settings.feedbackOnKeyPress) {
          showKeyPress("audio");
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

    const gameSleep = ms => new Promise(
      (resolve) => {
        if (!isGameStopped) {
          const unwatchAbortGame2 = abortGame.watch(() => {
            resolve();
            unwatchAbortGame();
          });
          setTimeout(() => {
            unwatchAbortGame2();
            resolve();
          }, ms);
        } else {
          resolve();
        }
      },
    );

    if (!isGameStopped) {
      await gameSleep(1000);
    }

    while (!isGameStopped) {
      const signals = gameLine.shift();

      if (signals) {
        showGameSquareElement({ position: signals.sets.position });
        sounds[signals.sets.sound].play();

        if (settings.trialTimeMode === "static") {
          // eslint-disable-next-line no-await-in-loop
          await gameSleep(settings.trialTimeMs - showErrorTimeMs);
        } else if (settings.trialTimeMode === "dynamic") {
          // eslint-disable-next-line no-await-in-loop
          await gameSleep(settings.timeInitialMs + increment - showErrorTimeMs);
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
        await gameSleep(showErrorTimeMs);
        resetGameButtons();
      } else {
        stop();
      }
    }

    unwatchAbortGame();
    unwatchPositionMatchKeyPress();
    unwatchAudioMatchKeyPress();
    unwatchPositionMatchButtonPress();
    unwatchAudioMatchButtonPress();

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
        const fallbackCount = settings.thresholdFallbackCount;

        if ((gameResults.length >= fallbackCount) && gameMode.level !== 1) {
          const gameResultsRev = gameResults.reverse();
          const lastResults = gameResultsRev.slice(0, fallbackCount);
          // eslint-disable-next-line no-unused-vars
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
  },
);

const setNextSetWidgetEffect = createEffect().use(setNextSetWidget);

export const $isGameStarted = createStore(false)
  .on(startGame, () => true)
  .on(stopGame, () => false)
  .on(startGameKeyPress, (state) => {
    if (!state) {
      startGame();
    }

    return true;
  })
  .on(abortGameKeyPress, (state) => {
    if (state) {
      abortGame();
    }

    return false;
  });

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
})
  .on(setGameButtons, (state, newKeys) => {
    const updated = merge({}, state, newKeys);

    return updated;
  })
  .reset(resetGameButtons);

$gameButtons.watch(showKeyPress, (state, key) => {
  if (!state[key].disabled) {
    showKeyPressEffect(key);
  }
});

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
    gameResults: $gameResults,
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
    startGameKeyPress();
  } else if (keyCode === 27) { // Esc
    abortGameKeyPress();
  } else if (keyCode === 65) { // A: Position Match
    positionMatchKeyPress();
  } else if (keyCode === 76) { // L: Audio Match
    audioMatchKeyPress();
  } else {
    // console.log(keyCode);
  }
};

document.addEventListener("keydown", keyDown, false);
