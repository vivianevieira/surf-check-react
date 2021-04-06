import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/SurfData.module.css';

export default function SurfCheckHeader({ location }) {
  const { formatted } = location;

  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const addFavorite = (location) => {
    setFavorites([...favorites, location]);
  };

  const removeFavorite = (favToBeDeleted) => {
    setFavorites(favorites.filter((fav) =>
      favToBeDeleted.geometry.lat !== fav.geometry.lat && favToBeDeleted.geometry.lng !== fav.geometry.lng
    ));
  };

  const handleFavClicked = (props) => {
    isFavorite ? removeFavorite(props) : addFavorite(props);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favSurfSpots'));
    if (favorites) {
      setFavorites(favorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favSurfSpots', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const result = favorites.filter((fav) =>
      location.geometry.lat === fav.geometry.lat && location.geometry.lng === fav.geometry.lng
    );
    if (result.length > 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

  return (
    <div className={styles.SurfDataTitle}>
      <div>
        <h3 className={styles.surfDataLocTitle}>{formatted}</h3>
      </div>
      <div>
        <button
          type="button"
          className={styles.SurfDataFavBtn}
          onClick={() => handleFavClicked(location)}>
          <FontAwesomeIcon
            icon={faHeart}
            size="lg"
            className={isFavorite ? styles.SurfDataFavIconHighlighted : styles.SurfDataFavIcon} />
        </button>
      </div>
    </div>
  );
}
