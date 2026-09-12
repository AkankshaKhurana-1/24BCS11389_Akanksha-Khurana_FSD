/**
 * Formats time in milliseconds to an object or string representation.
 * @param {number} ms - Time in milliseconds
 * @returns {object} { hours, minutes, seconds, milliseconds, formattedString }
 */
export function formatTimeComponents(ms) {
  if (ms < 0 || isNaN(ms)) ms = 0;

  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10); // 2 decimal digits (00-99)

  const pad = (num, size = 2) => String(num).padStart(size, '0');

  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);
  const formattedMs = pad(milliseconds);

  const formattedString = hours > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMs}`
    : `${formattedMinutes}:${formattedSeconds}.${formattedMs}`;

  return {
    hours: formattedHours,
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    milliseconds: formattedMs,
    formattedString,
    totalMs: ms
  };
}

export function formatTime(ms) {
  return formatTimeComponents(ms).formattedString;
}
