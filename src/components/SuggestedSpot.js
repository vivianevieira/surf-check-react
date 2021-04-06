import { useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { SurfDataContext } from '../contexts/SurfDataContext';
import styles from '../styles/components/SuggestedSpots.module.css';

export function SuggestedSpot({ loc }) {
  const { handleLocationClicked } = useContext(SurfDataContext);

  const [location, setLocation] = useState({});

  const { spotName, geometry, countryFlag } = loc;

  const handleSuggestedSpotClicked = async () => {
    const lat = geometry.lat;
    const lng = geometry.lng;

    const url = 'https://api.opencagedata.com/geocode/v1/json';
    const apiKey = '2338c18f4b274400b9a2969d91cba7c7';

    try {
      const searchUrl = `${url}?q=${lat}+${lng}&key=${apiKey}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      const locationData =  data.results[0];
      setLocation({ ...locationData, formatted: spotName, geometry: geometry });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleSuggestedSpotClicked();
  }, []);

  return (
    <li>
      <NavLink to="/surfcheck" onClick={() => handleLocationClicked(location)}>
        <img className={styles.SuggestedSpotsFlag} src={`https://www.countryflags.io/${countryFlag}/flat/24.png`} />
        {spotName}
      </NavLink>
    </li>
  );
}
