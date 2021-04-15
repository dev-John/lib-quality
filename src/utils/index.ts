export function isLessThanAnHour(timestamp): Boolean {
  const ONE_HOUR = 60 * 60 * 1000;

  return (Date.now() - timestamp) < ONE_HOUR
}