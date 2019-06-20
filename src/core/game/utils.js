import isEqual from "lodash/isEqual";

export const soundLetters = ["c", "h", "k", "l", "q", "r", "s", "t"];

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

export const initResults = () => {
  const data = localStorage.getItem('results');
  let initialResults;
  if (data) {
    const results = JSON.parse(data);
    // Filter old
    const beginningOfTheDay = new Date();
    beginningOfTheDay.setHours(0, 0, 0, 0);
    initialResults = results.filter(result => result.date > beginningOfTheDay);
  } else {
    initialResults = [];
  }
  return initialResults;
};

export const saveResults = async (results) => {
  localStorage.setItem('results', JSON.stringify(results));
};

export const calcRate = (numberOfMatches, resultErrors) => {
  let sumMatches = 0;
  let sumErrors = 0;
  if (resultErrors.position !== undefined) {
    sumMatches += numberOfMatches;
    sumErrors += resultErrors.position;
  }
  if (resultErrors.audio !== undefined) {
    sumMatches += numberOfMatches;
    sumErrors += resultErrors.audio;
  }
  let rate;
  if (sumMatches) {
    rate = Math.round(((sumMatches - sumErrors) / sumMatches) * 100);
    if (rate < 0) {
      rate = 0;
    }
  } else {
    rate = 0;
  }
  return rate;
};

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

export const calcNumberOfTrials = (
  settingsTrialsNumber,
  settingsTrialsFactor,
  settingsTrialsExponent,
  gameModeLevel,
) => settingsTrialsNumber
  + ((gameModeLevel * settingsTrialsFactor) ** settingsTrialsExponent);

export const setNextSetWidget = async ({ settings, gameMode }) => {
  const numberOfTrials = calcNumberOfTrials(
    settings.trialsNumber,
    settings.trialsFactor,
    settings.trialsExponent,
    gameMode.level,
  );
  const {
    trialTimeMode,
    trialTimeMs,
    timeInitialMs,
    timeIncrementMs,
  } = settings;

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
    level,
    numberOfTrials - 1,
  );

  for (let i = 0; i < numberOfTrials; i += 1) {
    matchesArray.push(false);
  }
  matchesIndexes.forEach((el) => { matchesArray[el] = true; });

  for (let i = 0; i < level; i += 1) {
    array.push({ position: getRandomPosition(), match: false });
  }
  for (let i = level; i < numberOfTrials; i += 1) {
    const prevPosition = array[i - level].position;
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

const getRandomSound = () => soundLetters[Math.floor(Math.random() * soundLetters.length)];

const generateSoundLine = (level, numberOfTrials, numberOfMatches) => {
  const array = [];

  const matchesArray = [];
  const matchesIndexes = getArrayOfRandomNonRepeatingNumbers(
    numberOfMatches,
    level,
    numberOfTrials - 1,
  );

  for (let i = 0; i < numberOfTrials; i += 1) { // actually I don't respect no-plusplus rule
    matchesArray.push(false);
  }
  matchesIndexes.forEach((el) => { matchesArray[el] = true; });

  for (let i = 0; i < level; i += 1) {
    array.push({ sound: getRandomSound(), match: false });
  }
  for (let i = level; i < numberOfTrials; i += 1) {
    const prevSound = array[i - level].sound;
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

export const calcNumberOfMatches = numberOfTrials => Math.floor(numberOfTrials / 4);

export const generateGameLine = ({ settings, gameMode }) => {
  const numberOfTrials = calcNumberOfTrials(
    settings.trialsNumber,
    settings.trialsFactor,
    settings.trialsExponent,
    gameMode.level,
  );
  const numberOfMatches = calcNumberOfMatches(numberOfTrials);

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

  return gameLine;
};

export const formatTimeFromMs = (timeMs) => {
  const timeMin = Math.trunc(timeMs / 60000);
  const timeSec = Math.trunc((timeMs - timeMin * 60000) / 1000);
  const timeMsec = timeMs - timeMin * 60000 - timeSec * 1000;
  let timeFormated = "";
  if (timeMin !== 0) {
    timeFormated += `${timeMin && `${timeMin} m. `}`;
  }
  if (timeSec !== 0) {
    timeFormated += `${timeSec && `${timeSec} s. `}`;
  }
  if (timeMsec !== 0) {
    timeFormated += `${timeMsec && `${timeMsec} ms. `}`;
  }
  return timeFormated;
};
