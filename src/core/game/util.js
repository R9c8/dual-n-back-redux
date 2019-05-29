import { isEqual } from "lodash";

const sounds = ["c", "h", "k", "l", "q", "r", "s", "t"];

const defaultSettings = {
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
  feedbackOnError: true,
  feedbackOnKeyPress: true,
};

const defaultMode = {
  level: 2,
  match: {
    position: true,
    audio: true,
    number: false,
    color: false,
    shape: false,
  },
};

const defaultVolume = 60;

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const initSettings = () => {
  const data = localStorage.getItem('settings');
  let initialSettings;
  if (data) {
    initialSettings = JSON.parse(data);
  } else {
    initialSettings = defaultSettings;
  }
  return initialSettings;
};

export const saveSettings = async (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

export const initMode = () => {
  const data = localStorage.getItem('mode');
  let initialMode;
  if (data) {
    initialMode = JSON.parse(data);
  } else {
    initialMode = defaultMode;
  }
  return initialMode;
};

export const saveMode = async (mode) => {
  localStorage.setItem('mode', JSON.stringify(mode));
};

export const initVolume = () => {
  const data = localStorage.getItem('volume');
  let initialVolume;
  if (data) {
    initialVolume = Number(data);
  } else {
    initialVolume = defaultVolume;
  }
  return initialVolume;
};

export const saveVolume = async (volume) => {
  localStorage.setItem('volume', volume.toString());
};

// for setNextSetWidget
export const calcDuration = (
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

const calcNumberOfTrials = (
  settingsTrialsNumber,
  settingsTrialsFactor,
  settingsTrialsExponent,
  gameModeLevel,
) => Number(settingsTrialsNumber)
  + ((gameModeLevel * Number(settingsTrialsFactor)) ** Number(settingsTrialsExponent));

export const setNextSetWidget = async ({ settings, gameMode }) => {
  const numberOfTrials = calcNumberOfTrials(
    settings.trialsNumber,
    settings.trialsFactor,
    settings.trialsExponent,
    gameMode.level,
  );
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

const getIntRandomNumber = (minInt, maxInt) => (
  Math.round(Math.random() * (maxInt - minInt)) + minInt
);

const getArrayOfRandomNonRepeatingNumbers = (length, minInt, maxInt) => {
  const array = [];

  array.push(getIntRandomNumber(minInt, maxInt));

  for (let i = 1; i < length; i += 1) {
    let num;
    do {
      num = getIntRandomNumber(minInt, maxInt);
    }
    // eslint-disable-next-line no-loop-func
    while (array.some(el => el === num));
    array.push(num);
  }
  return array;
};

const getRandomPosition = () => [getIntRandomNumber(1, 3), getIntRandomNumber(1, 3)];

const generatePositionLine = (level, numberOfTrials, numberOfMatches) => {
  const array = [];

  const matchesArray = [];
  const matchesIndexes = getArrayOfRandomNonRepeatingNumbers(
    numberOfMatches,
    level - 1,
    numberOfTrials - 1,
  );

  for (let i = 0; i < numberOfTrials; i += 1) {
    matchesArray.push(false);
  }
  matchesIndexes.forEach((el) => { matchesArray[el] = true; });

  for (let i = 0; i < level; i += 1) {
    array.push({ position: getRandomPosition(), match: false });
  }
  for (let i = level - 1; i < numberOfTrials - 1; i += 1) {
    const prevPosition = array[i - level + 1].position;
    if (matchesArray[i] === false) {
      let rndPosition;
      do {
        rndPosition = getRandomPosition();
      }
      // eslint-disable-next-line no-loop-func
      while (isEqual(rndPosition, prevPosition));
      array.push({ position: rndPosition, match: false });
    } else {
      array.push({ position: prevPosition, match: true });
    }
  }

  return array;
};

const getRandomSound = () => sounds[Math.floor(Math.random() * sounds.length)];

const generateSoundLine = (level, numberOfTrials, numberOfMatches) => {
  const array = [];

  const matchesArray = [];
  const matchesIndexes = getArrayOfRandomNonRepeatingNumbers(
    numberOfMatches,
    level - 1,
    numberOfTrials - 1,
  );

  for (let i = 0; i < numberOfTrials; i += 1) { // actually I don't respect no-plusplus rule
    matchesArray.push(false);
  }
  matchesIndexes.forEach((el) => { matchesArray[el] = true; });

  for (let i = 0; i < level; i += 1) {
    array.push({ sound: getRandomSound(), match: false });
  }
  for (let i = level - 1; i < numberOfTrials - 1; i += 1) {
    const prevSound = array[i - level + 1].sound;
    if (matchesArray[i] === false) {
      let rndSound;
      do {
        rndSound = getRandomSound();
      }
      // eslint-disable-next-line no-loop-func
      while (rndSound === prevSound);
      array.push({ sound: rndSound, match: false });
    } else {
      array.push({ sound: prevSound, match: true });
    }
  }

  return array; // [{sound: "c", match: false}, ...]
};

export const generateGameLine = ({ settings, gameMode }) => {
  const numberOfTrials = calcNumberOfTrials(
    settings.trialsNumber,
    settings.trialsFactor,
    settings.trialsExponent,
    gameMode.level,
  );
  const numberOfMatches = Math.floor(numberOfTrials / 4);

  const positionLine = generatePositionLine(gameMode.level, numberOfTrials, numberOfMatches);
  const soundLine = generateSoundLine(gameMode.level, numberOfTrials, numberOfMatches);

  const gameLine = [];

  for (let i = 0; i < numberOfTrials; i += 1) {
    gameLine[i] = { sets: {}, matches: {} };
  }

  if (gameMode.match.position === true) {
    positionLine.forEach((el, i) => {
      gameLine[i].sets.position = el.position;
      gameLine[i].matches.position = el.match;
    });
  }

  if (gameMode.match.audio === true) {
    soundLine.forEach((el, i) => {
      gameLine[i].sets.sound = el.sound;
      gameLine[i].matches.sound = el.match;
    });
  }

  console.log(numberOfMatches, gameMode.level, numberOfTrials);
  console.log(gameLine);
};

// [
//   {
//     sets: { position: [1, 2], sound: "s" }
//     matches: { position: false, sound: true },
//   }
// ]
