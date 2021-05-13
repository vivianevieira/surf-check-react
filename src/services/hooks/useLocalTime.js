export default function useLocalTime(location) {
  const timeOffset = location.annotations.timezone.offset_sec;

  const date = new Date();
  const localOffset = new Date().getTimezoneOffset(); // in minutes
  const localOffsetMillis = 60 * 1000 * localOffset;

  const locationOffsetMillis = timeOffset * 1000;

  const millisOffset = locationOffsetMillis + localOffsetMillis;

  const locationTime = new Date(date.getTime() + (millisOffset));

  return {locationTime, timeOffset, localOffsetMillis};
}
