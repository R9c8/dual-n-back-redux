export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const initSettings = () => ({
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
});

export const initMode = () => ({
  level: 2,
  match: {
    position: true,
    audio: true,
    number: false,
    color: false,
    shape: false,
  },
});

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

export const generateGameLine = ({ settings, gameMode }) => {
  const numberOfTrials = calcNumberOfTrials(
    settings.trialsNumber,
    settings.trialsFactor,
    settings.trialsExponent,
    gameMode.level,
  );
  // const numberOfMatches =
};

// [
//   {
//     position: [1, 2],
//     sound: "s",
//     matches: { position: false, sound: true },
//   }
// ]
