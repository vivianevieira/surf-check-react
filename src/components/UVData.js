import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/components/SurfData.module.css';
import compomentStyles from '../styles/components/UVData.module.css';

export default function UVData({ location }) {
  const [UVmax, setUVmax] = useState({});

  const getUVData = async () => {
    const url = 'https://api.openuv.io/api/v1/uv';
    const apiKey = process.env.REACT_APP_OPENUV_API_KEY;

    const lat = location.geometry.lat;
    const long = location.geometry.lng;

    const now = new Date();
    const startTime = now.toISOString();

    try {
      const searchUrl = `${url}?lat=${lat}&lng=${long}&dt=${startTime}`;
      const response = await fetch(searchUrl, {
        headers: {
          'x-access-token': apiKey
        }
      });
      const jsonData = await response.json();

      const UVmaxResult = Math.round(jsonData.result.uv_max);

      let level;
      let UVcolor;
      if (UVmaxResult >= 0 && UVmaxResult < 3 ) {
        level = 'Low';
        UVcolor = '#558B2F';
      } else if (UVmaxResult >= 3 && UVmaxResult < 6) {
        level = 'Moderate';
        UVcolor = '#F9A825';
      } else if (UVmaxResult>= 6 && UVmaxResult < 8) {
        level = 'High';
        UVcolor = '#EF6C00';
      } else if (UVmaxResult >= 8 && UVmaxResult < 11) {
        level = 'Very High';
        UVcolor = '#B71C1C';
      } else if (UVmaxResult >= 11) {
        level = 'Extreme';
        UVcolor = '#6A1B9A';
      };

      setUVmax({
        UVindex: UVmaxResult,
        UVLevel: level,
        UVcolor: UVcolor
      });
    } catch (e) {
      console.log(e);
    }
  }

  const myStyle = {
        color: UVmax.UVcolor,
      }

  useEffect(() => {
    getUVData();
  }, []);



  return (
    <div className={styles.SurfDataSwellsCont}>
      <div className={styles.SurfDataStatTitle}>
        UV Index
      </div>
      <div className={compomentStyles.UVmaxcontainer}>
        <FontAwesomeIcon
        style={myStyle}
        icon={faSun}
        size="lg"
        />
        <div className={styles.SurfDataValues}>
          {UVmax.UVindex}
        </div>
      </div>
      <div>
        <span>{UVmax.UVLevel}</span>
      </div>
      <div className={styles.SurfDataWindGust}>
        (daily highest)
      </div>
    </div>

  );
}
