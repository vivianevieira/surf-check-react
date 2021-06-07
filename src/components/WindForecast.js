import { useEffect } from "react";
import useLocalTime from "../services/hooks/useLocalTime";

export default function WindForecast({ location }) {
  const {
    startDateTideISOString,
    endDateISOString
  } = useLocalTime(location);

  const getWindData = async () => {
    const url = 'https://api.stormglass.io/v2/weather/point';
    const apiKey = '66d9612a-22c0-11eb-a5a9-0242ac130002-66d961a2-22c0-11eb-a5a9-0242ac130002';

    const lat = location.geometry.lat;
    const lng = location.geometry.lng;

    const params = [
      'windSpeed', 'windDirection', 'gust'
    ].join(',');

    const searchUrl = `${url}?lat=${lat}&lng=${lng}&params=${params}&source=noaa&start=${startDateTideISOString}&end=${endDateISOString}`;

    try {
      const response = await fetch(searchUrl, {
        headers: {
          'Authorization': apiKey
        }
      });
      const jsonData = await response.json();

      console.log(jsonData)
      // const tideDataArray = jsonData.data;
      // setTideData(tideDataArray);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getWindData();
  }, []);

  return (
    <div>Wind forecast</div>

  );
}
