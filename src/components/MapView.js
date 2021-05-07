import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import styles from '../styles/components/MapView.module.css';

export default function MapView() {
  const [viewport, setViewport] = useState({
    latitude: -28.1676805,
    longitude: 153.5295271,
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
    >
      <Marker latitude={-28.1676805} longitude={153.5295271} offsetLeft={-20} offsetTop={-10}>
        <div className={styles.marker}><span></span></div>
      </Marker>
     </ReactMapGL>
    </div>
    </>
  );
}
