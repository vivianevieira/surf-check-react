import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWater, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import globeImg from '../assets/images/globe.png'
import styles from '../styles/components/SurfData.module.css';

export default function SurfData({ location, loading, surfData }) {
  const { formatted } = location;

  const {
    waveHeight,
    swellDirection,
    swellPeriod,
    secondarySwellHeight,
    secondarySwellPeriod,
    secondarySwellDirection,
    windWaveHeight,
    windWaveDirection,
    windWavePeriod,
    waterTemperature,
    airTemperature,
    windSpeed,
    windDirection,
    gust
  } = surfData;

  //convert values from mt to ft, C° to F°, and from mt to knot
  const waveHeightValue = Math.round(waveHeight.noaa * 3.281);
  const swellDirectionValue =Math.round(swellDirection.noaa);
  const swellPeriodValue = Math.round(swellPeriod.noaa);
  const secondarySwellHeightValue = Math.round(secondarySwellHeight.noaa * 3.281);
  const secondarySwellPeriodValue = Math.round(secondarySwellPeriod.noaa);
  const secondarySwellDirectionValue = Math.round(secondarySwellDirection.noaa);
  const windWaveHeightValue = Math.round(windWaveHeight.noaa * 3.281);
  const windWavePeriodValue = Math.round(windWavePeriod.noaa);
  const windWaveDirectionValue = Math.round(windWaveDirection.noaa);

  const waterTemperatureValue = Math.round(waterTemperature.noaa * 9 / 5) + 32;
  const airTemperatureValue = Math.round(airTemperature.noaa * 9 / 5) + 32;

  const windSpeedValue = Math.round(windSpeed.noaa * 1.944);
  const windDirectionValue = Math.round(windDirection.noaa);
  const gustValue = Math.round(gust.noaa * 1.944);

  return (
    <>
      <div>
        <img src={globeImg} alt="" className={styles.SurfDataMapImage} />
      </div>
      <div className={styles.SurfDataCont}>
        <div>
          <div className={styles.SurfDataWaveHeightTitle}>Wave Height</div>
          <div className={styles.SurfDataWaveHeightvalue}>
            {waveHeightValue}
            <span className={styles.SurfDataSup}>ft</span>
          </div>
          <div className={styles.SurfDataPrimarySwell}>{swellPeriodValue}s {swellDirectionValue}°</div>
          <div className={styles.SurfDataPrimarySwellTitle}>Secondary Swell</div>
          <div className={styles.SurfDataValues}>
            {`${secondarySwellHeightValue}ft at ${secondarySwellPeriodValue}s ${secondarySwellDirectionValue}°`}
          </div>
          <div className={styles.SurfDataPrimarySwellTitle}>Wind Swell</div>
          <div className={styles.SurfDataValues}>
            {`${windWaveHeightValue}ft at ${windWavePeriodValue}s ${windWaveDirectionValue}°`}
          </div>
        </div>
        <div>
          <div className={styles.SurfDataTempCont}>
            <div className={styles.SurfDataWaterTemp}>
              <div className={styles.SurfDataTempTitle}>Water</div>
              <div>
                <FontAwesomeIcon icon={faWater} size="lg" className={styles.SurfDataWaterTempIcon} />
              </div>
              <div className={styles.SurfDataValues}>{`${waterTemperatureValue}°F`}</div>
            </div>
            <div className={styles.SurfDataAirTemp}>
              <div className={styles.SurfDataTempTitle}>Air</div>
              <div>
                <FontAwesomeIcon icon={faThermometerHalf} size="lg" className={styles.SurfDataAirTempIcon} />
              </div>
              <div className={styles.SurfDataValues}>{`${airTemperatureValue}°F`}</div>
            </div>
          </div>
          <div className={styles.SurfDataWindCont}>
            <div className={styles.SurfDataWindTitle}>Wind</div>
            <div className={styles.SurfDataValues}>{`${windSpeedValue}kts ${windDirectionValue}°`}</div>
            <div className={styles.SurfDataWindGust}>{`(${gustValue}kts gusts)`}</div>
          </div>
        </div>
      </div>
    </>
  );
}
