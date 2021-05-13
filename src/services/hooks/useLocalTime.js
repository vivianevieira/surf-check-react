export default function useLocalTime(location) {
  const timeOffset = location.annotations.timezone.offset_sec;

  const date = new Date();
  const localOffset = new Date().getTimezoneOffset(); // in minutes
  const localOffsetMillis = 60 * 1000 * localOffset;

  const locationOffsetMillis = timeOffset * 1000;

  const millisOffset = locationOffsetMillis + localOffsetMillis;

  const locationTime = new Date(date.getTime() + (millisOffset));

  const startDate = new Date(locationTime.getUTCFullYear(),
  locationTime.getUTCMonth(),locationTime.getUTCDate(), 0, 0, 0, -localOffsetMillis);
  const startDateISOString = startDate.toISOString();

  const startDateTide = new Date(locationTime.getFullYear(),
  locationTime.getMonth(),locationTime.getDate(), 0, 0, 0, -millisOffset);
  const startDateTideISOString = startDateTide.toISOString();

  const endDate = new Date(locationTime.getFullYear(),
  locationTime.getMonth(),locationTime.getDate(), 23, 59, 59, -millisOffset);
  const endDateISOString = endDate.toISOString();

  return {
    locationTime,
    timeOffset,
    startDateISOString,
    startDateTideISOString,
    endDateISOString
  };
}
