import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faThermometerHalf, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import MapView from './MapView';
import globeImg from '../assets/images/globe.png'
import styles from '../styles/components/SurfData.module.css';
import UVData from './UVData';

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
      {/* <MapView location={location} /> */}
      <div className={styles.SurfDataCont}>
        <div className={styles.SurfDataStatCont}>
          <div className={styles.SurfDataStatTitle}>
            Wave Height
          </div>
          <div className={styles.SurfDataWaveHeightvalue}>
            {waveHeightValue}
            <span className={styles.SurfDataSup}>ft</span>
          </div>
          <div className={styles.SurfDataPrimarySwell}>
            {`${swellPeriodValue}s ${swellDirectionValue}° `}
            <FontAwesomeIcon
              icon={faArrowDown}
              size="xs"
              style={{ transform: `rotate(${swellDirectionValue}deg)`}}
            />
          </div>
          <div className={styles.SurfDataSwellsCont}>
            <div className={styles.SurfDataSwellsTitle}>
              Secondary Swell
            </div>
            <div className={styles.SurfDataValues}>
              {`${secondarySwellHeightValue}ft at ${secondarySwellPeriodValue}s ${secondarySwellDirectionValue}° `}
              <FontAwesomeIcon
                icon={faArrowDown}
                size="sm"
                style={{ transform: `rotate(${secondarySwellDirectionValue}deg)`}}
              />
            </div>
            <div className={styles.SurfDataSwellsTitle}>
              Wind Swell
            </div>
            <div className={styles.SurfDataValues}>
              {`${windWaveHeightValue}ft at ${windWavePeriodValue}s ${windWaveDirectionValue}° `}
              <FontAwesomeIcon
                icon={faArrowDown}
                size="sm"
                style={{ transform: `rotate(${windWaveDirectionValue}deg)`}}
              />
            </div>
          </div>
        </div>
        <div className={styles.SurfDataStatCont}>
          <div className={styles.SurfDataTempCont}>
            <div className={styles.SurfDataWaterTemp}>
              <div className={styles.SurfDataTempTitle}>
                Water
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faWater}
                  size="lg"
                  className={styles.SurfDataWaterTempIcon}
                />
              </div>
              <div className={styles.SurfDataValues}>
                {`${waterTemperatureValue}°F`}
              </div>
            </div>
            <div className={styles.SurfDataAirTemp}>
              <div className={styles.SurfDataTempTitle}>
                Air
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faThermometerHalf}
                  size="lg"
                  className={styles.SurfDataAirTempIcon}
                />
              </div>
              <div className={styles.SurfDataValues}>
                {`${airTemperatureValue}°F`}
              </div>
            </div>
          </div>
          <div className={styles.SurfDataWindCont}>
            <div className={styles.SurfDataStatTitle}>
              Wind
            </div>
            <div className={styles.SurfDataValues}>
              {`${windSpeedValue}kts ${windDirectionValue}° `}
              <FontAwesomeIcon
                icon={faArrowDown}
                size="sm"
                style={{ transform: `rotate(${windDirectionValue}deg)`}}
            />
            </div>
            <div className={styles.SurfDataWindGust}>
              {`(${gustValue}kts gusts)`}
            </div>
            <UVData location={location}/>
          </div>
        </div>
      </div>
    </>
  );
}
