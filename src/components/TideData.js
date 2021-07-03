import { useEffect, useState } from "react";
import useLocalTime from "../services/hooks/useLocalTime";
import styles from '../styles/components/TideData.module.css';


export default function TideData({ location }) {
  const [tideData, setTideData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const {
    timeOffset,
    startDateTideISOString,
    endDateISOString
  } = useLocalTime(location);

  const getTideData = async () => {
    const url = 'https://api.stormglass.io/v2/tide/extremes/';
    const apiKey = process.env.REACT_APP_STORMGLASS_API;

    const lat = location.geometry.lat;
    const lng = location.geometry.lng;

    try {
      const searchUrl = `${url}point?lat=${lat}&lng=${lng}&datum=MLLW&start=${startDateTideISOString}&end=${endDateISOString}`;
      const response = await fetch(searchUrl, {
        headers: {
          'Authorization': apiKey
        }
      });
      const jsonData = await response.json();

      const tideDataArray = jsonData.data;
      setTideData(tideDataArray);

      setShowInfo(!showInfo);
    } catch (e) {
      console.log(e);
    }
  }

    useEffect(() => {
      getTideData();
  }, []);

  return (
    <>
      {showInfo ?
      <div className={styles.container}>
        <div className={styles.title}>
          <h3 className={styles.header}>Tide</h3>
        </div>
        <div className={styles.tableCont}>
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
      </div>
      : null}
    </>
  );
}
