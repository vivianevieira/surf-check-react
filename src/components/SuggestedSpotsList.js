import { SuggestedSpot } from './SuggestedSpot';
import styles from '../styles/components/SuggestedSpots.module.css';

const locationsList = [
  {
    spotName: 'Jeffreys Bay, South Africa',
    geometry: {
      lat: -34.0297919,
      lng: 24.8960619
    },
    countryFlag: 'za'
  },
  {
    spotName: 'Kirra, Queensland, Australia',
    geometry: {
      lat: -28.1676805,
      lng: 153.5295271
    },
    countryFlag: 'au'
  },
    {
    spotName: 'Punta Roca, El Salvador',
    geometry: {
      lat: 13.481851,
      lng: -89.324228
    },
    countryFlag: 'sv'
  },
    {
    spotName: 'Uluwatu, Bali, Indonesia',
    geometry: {
      lat: -8.83143,
      lng: 115.08702
    },
    countryFlag: 'id'
  },
   {
    spotName: 'Swamis Beach, CA USA',
    geometry: {
      lat: 33.0466108,
      lng: -117.2563856
    },
    countryFlag: 'us'
  }
]

export default function SuggestedSpotsList() {
  return (
    <div className={styles.SuggestedSpotsContainer}>
      <p>Suggestions of famous surf spots:</p>
      <ul>
        {locationsList.map(loc => {
          return <SuggestedSpot key={loc.spotName} loc={loc} />
        })}
      </ul>
    </div>

  );
}
