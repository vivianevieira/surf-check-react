import { useContext } from 'react';
import { SurfDataContext } from '../contexts/SurfDataContext';

import Loader from '../components/Loader';
import SurfData from '../components/SurfData';
import SunlightTimes from '../components/SunlightTimes'
import SurfCheckHeader from '../components/SurfCheckHeader';
import TideData from '../components/TideData';
import MapView from '../components/MapView';

import styles from '../styles/pages/SurfCheck.module.css'
import LocalDateHeader from '../components/LocalDateHeader';

export default function SurfCheck () {
  const { location, loading, surfData, invalidSpot } = useContext(SurfDataContext);

  return (
    <>
    {invalidSpot ? (
      <p>No surf data available for this spot.</p>
    ) :
    (loading ? <Loader /> :
    <>
      <SurfCheckHeader location={location} />
      <LocalDateHeader location={location} />
      <div className={styles.SurfCheckCont}>
        <div className={styles.SurfCheckModule}>
          <div className={styles.SurfCheckWrapper}>
            <MapView location={location} />
            <SurfData surfData={surfData} location={location} loading={loading} />
          </div>
        </div>
      </div>
      <div className={styles.SurfCheck}>
        <div className={styles.SurfCheckCont}>
          <SunlightTimes location={location} />
          <TideData location={location} />
        </div>
      </div>
     </>
    )}
    </>
  );
}
