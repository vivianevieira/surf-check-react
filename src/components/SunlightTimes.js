import { useState, useEffect } from 'react';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import useLocalTime from '../services/hooks/useLocalTime';

import styles from '../styles/components/SunlightTimes.module.css';

export default function SunlightTimes({ location }) {
  const [sunlightData, setsunlightData] = useState({
    firstLight: '',
    sunriseTime: '',
    sunsetTime: '',
    lastLight: ''
  });

  const [showInfo, setShowInfo] = useState(false);

  const {
    timeOffset,
    startDateISOString
  } = useLocalTime(location);

  const getSunlightData = async () => {
    const url = 'https://api.stormglass.io/v2/astronomy/';
    const apiKey = '66d9612a-22c0-11eb-a5a9-0242ac130002-66d961a2-22c0-11eb-a5a9-0242ac130002';

    const lat = location.geometry.lat;
    const long = location.geometry.lng;

    try {
      const searchUrl = `${url}point?lat=${lat}&lng=${long}&start=${startDateISOString}`
      const response = await fetch(searchUrl, {
        headers: {
          'Authorization': apiKey
        }
      });
      const jsonData = await response.json();

      let dawn = new Date(jsonData.data[0].civilDawn);
      let dusk = new Date(jsonData.data[0].civilDusk);
      let sunrise = new Date(jsonData.data[0].sunrise);
      let sunset = new Date(jsonData.data[0].sunset);

      const dawnDateObj = new Date(dawn.getTime() + (dawn.getTimezoneOffset() * 60000) + (timeOffset * 1000));
      const duskDateObj = new Date(dusk.getTime() + (dusk.getTimezoneOffset() * 60000) + (timeOffset * 1000));
      const sunriseDateObj = new Date(sunrise.getTime() + (sunrise.getTimezoneOffset() * 60000) + (timeOffset * 1000));
      const sunsetDateObj = new Date(sunset.getTime() + (sunset.getTimezoneOffset() * 60000) + (timeOffset * 1000));

      const firstLight = `${dawnDateObj.getHours()}:${dawnDateObj.getMinutes() > 9
        ? dawnDateObj.getMinutes()
        : '0' + dawnDateObj.getMinutes()} am`;
      const sunriseTime = `${sunriseDateObj.getHours()}:${sunriseDateObj.getMinutes() > 9
        ? sunriseDateObj.getMinutes()
        : '0' + sunriseDateObj.getMinutes()} am`;
      const sunsetTime = `${sunsetDateObj.getHours() - 12}:${sunsetDateObj.getMinutes() > 9
        ? sunsetDateObj.getMinutes()
        : '0' + sunsetDateObj.getMinutes()} pm`;
      const lastLight = `${duskDateObj.getHours() - 12}:${duskDateObj.getMinutes() > 9
        ? duskDateObj.getMinutes()
        : '0' + duskDateObj.getMinutes()} pm`;

      setsunlightData({
        firstLight: firstLight,
        sunriseTime: sunriseTime,
        sunsetTime: sunsetTime,
        lastLight: lastLight
      })

      setShowInfo(!showInfo);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSunlightData();
  }, []);

  return (
    <>
    {showInfo ?
    <div className={styles.SunlightTimesCont}>
      <div className={styles.SunlightTimesDateHeader}>
        <h3 className={styles.SunlightTimesTitle}>
          Sunlight times
        </h3>
      </div>
      <div className={styles.SunlightTimesData}>
        <div className={styles.SunlightTimesIcon}>
          <div style={{ color: '#ffc107', fontSize: 20}}>
            <FiSunrise />
          </div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>First light:</td>
                <td><span>{sunlightData.firstLight}</span></td>
              </tr>
              <tr>
                <td>Sunrise:</td>
                <td><span>{sunlightData.sunriseTime}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.SunlightTimesData}>
        <div className={styles.SunlightTimesIcon}>
          <div style={{ color: '#ef6c00', fontSize: 20}}>
            <FiSunset />
          </div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Sunset:</td>
                <td><span>{sunlightData.sunsetTime}</span></td>
              </tr>
              <tr>
                <td>Last light:</td>
                <td><span>{sunlightData.lastLight}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
    </div>
    : null}
    </>
  );
}
