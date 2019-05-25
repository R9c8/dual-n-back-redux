export const formatTimeFromMs = (timeMs) => {
  const timeMin = Math.trunc(timeMs / 60000);
  const timeSec = Math.trunc((timeMs - timeMin * 60000) / 1000);
  const timeMsec = timeMs - timeMin * 60000 - timeSec * 1000;
  let timeFormated = "";
  if (timeMin !== 0) {
    timeFormated += `${timeMin && `${timeMin}m. `}`;
  }
  if (timeSec !== 0) {
    timeFormated += `${timeSec && `${timeSec}s. `}`;
  }
  if (timeMsec !== 0) {
    timeFormated += `${timeMsec && `${timeMsec}ms. `}`;
  }
  return timeFormated;
};
