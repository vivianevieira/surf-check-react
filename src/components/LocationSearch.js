import React, { useContext } from 'react';
import { LocSearchContext } from '../contexts/LocSearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/LocationSearch.module.css';

export default function LocationSearch() {
  const { handleSubmit, handleSearchChange } = useContext(LocSearchContext);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.locationSearchContainer}>
          <input
            required
            id="searchInput"
            name="searchInput"
            type="text"
            placeholder="Search for surf spot or city"
            onChange={(e) => handleSearchChange(e)}
           />
        </div>
        <div className={styles.locationSearchBtn}>
          <button type="submit" id="locationSearchBtn">
            <FontAwesomeIcon icon={faCompass} className={styles.locationSearchBtnMargin} />
            Search
          </button>
        </div>
      </form>
    </>
  );
}
