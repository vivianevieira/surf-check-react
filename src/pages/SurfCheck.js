import { useContext } from 'react';
import SurfData from '../components/SurfData';
import SunlightTimes from '../components/SunlightTimes'
import Loader from '../components/Loader';
import { SurfDataContext } from '../contexts/SurfDataContext';
import styles from '../styles/pages/SurfCheck.module.css'
import SurfCheckHeader from '../components/SurfCheckHeader';
import TideData from '../components/TideData';

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
      <SurfData surfData={surfData} location={location} loading={loading} />
      <div className={styles.SurfCheckLightTideCont}>
        <SunlightTimes location={location} />
        <TideData location={location} />
      </div>
     </>
    )}
    </>
  );
}
