import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import styles from '../styles/components/MapView.module.css';

export default function MapView() {
  const [viewport, setViewport] = useState({
    latitude: 33.0466108,
    longitude: -117.2563856,
    zoom: 8
  });

  return (
    <>
    <div className={styles.container}>
    <ReactMapGL
      mapboxApiAccessToken='pk.eyJ1Ijoidml2aWFuZXZpZWlyYSIsImEiOiJja29lbXdpM2cwYm1wMnVucTlwenh5eHFrIn0.ajI8dcsxTu-7r1_o8zprqw'
      mapStyle="mapbox://styles/mapbox/streets-v11"
      {...viewport}
      width="80%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
    </div>
    </>
  );
}
