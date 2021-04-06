import { useEffect, useState } from "react";
import styles from '../styles/components/TideData.module.css';


export default function TideData({ location }) {
  const [tideData, setTideData] = useState([]);

  const timeOffset = location.annotations.timezone.offset_sec;

  const getTideData = async () => {
    const url = 'https://api.stormglass.io/v2/tide/extremes/';
    const apiKey = '66d9612a-22c0-11eb-a5a9-0242ac130002-66d961a2-22c0-11eb-a5a9-0242ac130002';

    const lat = location.geometry.lat;
    const lng = location.geometry.lng;

    const date = new Date();
    const localOffset = date.getTimezoneOffset(); // in minutes

    const localOffsetMillis = 60 * 1000 * localOffset;

    const locationOffsetMillis = timeOffset * 1000;

    const millisOffset = locationOffsetMillis + localOffsetMillis;

    const locationDate = new Date(date.getTime() + (millisOffset));

    const startDate = new Date(locationDate.getFullYear(),
    locationDate.getMonth(),locationDate.getDate(), 0, 0, 0, -millisOffset);
    const startDateISOString = startDate.toISOString();

    const endDate = new Date(locationDate.getFullYear(),
    locationDate.getMonth(),locationDate.getDate(), 23, 59, 59, -millisOffset);
    const endDateISOString = endDate.toISOString();



    try {
      const searchUrl = `${url}point?lat=${lat}&lng=${lng}&datum=MLLW&start=${startDateISOString}&end=${endDateISOString}`;
      const response = await fetch(searchUrl, {
        headers: {
          'Authorization': apiKey
        }
      });
      const jsonData = await response.json();
      console.log(jsonData);

      const tideDataArray = jsonData.data;
      setTideData(tideDataArray);

    } catch (e) {
      console.log(e);
    }
  }

    useEffect(() => {
      getTideData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Tide</h3>
      </div>
      <table>
        <tbody>
          {tideData.map(tide => (
            <tr key={tide.time}>
              <td>{tide.type}</td>
              <td>
                {new Intl.DateTimeFormat('default', {
                  hour: 'numeric',
                  minute: 'numeric'
                }).format(new Date(new Date(tide.time).getTime() +
                (new Date(tide.time).getTimezoneOffset() * 60000) +
                (timeOffset * 1000)))}
              </td>
              <td>{Math.round((tide.height * 3.281) * 100)/100}ft</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
