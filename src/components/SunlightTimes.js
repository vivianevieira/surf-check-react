import { useState, useEffect } from 'react';
import sunriseImg from '../assets/images/sunrise.png';
import sunsetImg from '../assets/images/sunset.png';
import styles from '../styles/components/SunlightTimes.module.css';

export default function SunlightTimes({ location }) {
  const [sunlightData, setsunlightData] = useState({
    firstLight: '',
    sunriseTime: '',
    sunsetTime: '',
    lastLight: ''
  });
  const [showInfo, setShowInfo] = useState(false);

  const [dateHeader, setDateHeader] = useState('');

  const getSunlightData = async () => {
    const url = 'https://api.stormglass.io/v2/astronomy/';
    const apiKey = '66d9612a-22c0-11eb-a5a9-0242ac130002-66d961a2-22c0-11eb-a5a9-0242ac130002';

    const lat = location.geometry.lat;
    const long = location.geometry.lng;
    const timeOffset = location.annotations.timezone.offset_sec;

    const date = new Date();
    const localOffset = new Date().getTimezoneOffset(); // in minutes
    const localOffsetMillis = 60 * 1000 * localOffset;

    const locationOffsetMillis = timeOffset * 1000;

    const millisOffset = locationOffsetMillis + localOffsetMillis;

    const locationTime = new Date(date.getTime() + (millisOffset));
    const startDate = new Date(locationTime.getUTCFullYear(),
    locationTime.getUTCMonth(),locationTime.getUTCDate(), 0, 0, 0, -localOffsetMillis);

    const isoDateString = startDate.toISOString();

    const localDateHeader = new Intl.DateTimeFormat('en-US',
    { dateStyle: 'full' }).format(locationTime);

    setDateHeader(localDateHeader);

    try {
      const searchUrl = `${url}point?lat=${lat}&lng=${long}&start=${isoDateString}`
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

      const firstLight = `${dawnDateObj.getHours()}:${dawnDateObj.getMinutes() > 9 ? dawnDateObj.getMinutes() : '0'
      + dawnDateObj.getMinutes()} am`;
      const sunriseTime = `${sunriseDateObj.getHours()}:${sunriseDateObj.getMinutes() > 9 ? sunriseDateObj.getMinutes() : '0'
      + sunriseDateObj.getMinutes()} am`;
      const sunsetTime = `${sunsetDateObj.getHours() - 12}:${sunsetDateObj.getMinutes() > 9 ? sunsetDateObj.getMinutes() : '0'
      + sunsetDateObj.getMinutes()} pm`;
      const lastLight = `${duskDateObj.getHours() - 12}:${duskDateObj.getMinutes() > 9 ? duskDateObj.getMinutes() : '0'
      + duskDateObj.getMinutes()} pm`;

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
        {dateHeader}
      </div>
      <div className={styles.SunlightTimesData}>
        <div className={styles.SunlightTimesIcon}>
          <img src={sunriseImg} alt="" width="35px" />
        </div>
        <div>
          <div>
            First light: <span>{sunlightData.firstLight}</span>
          </div>
          <div>
            Sunrise: <span>{sunlightData.sunriseTime}</span>
          </div>
        </div>
      </div>
      <div className={styles.SunlightTimesData}>
        <div className={styles.SunlightTimesIcon}>
          <img src={sunsetImg} alt="" width="35px" />
        </div>
        <div>
          <div>
            Sunset: <span>{sunlightData.sunsetTime}</span>
          </div>
          <div>
            Last light: <span>{sunlightData.lastLight}</span>
          </div>
        </div>
      </div>
    </div>
    : null}
    </>
  );
}
