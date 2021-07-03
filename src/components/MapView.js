import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import styles from '../styles/components/MapView.module.css';

export default function MapView({ location }) {
  const { lat, lng } = location.geometry;

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 8
  });

  const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  return (
    <>
    <div className={styles.container}>
    <ReactMapGL
      mapboxApiAccessToken={mapboxApiKey}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Marker latitude={lat} longitude={lng} offsetLeft={-20} offsetTop={-10}>
        <div className={styles.marker}><span></span></div>
      </Marker>
     </ReactMapGL>
    </div>
    </>
  );
}
