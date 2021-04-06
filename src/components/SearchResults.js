import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LocSearchContext } from '../contexts/LocSearchContext';
import { SurfDataContext } from '../contexts/SurfDataContext';
import styles from '../styles/components/SearchResults.module.css';

export default function SearchResults() {
  const { locations, invalidSearch } = useContext(LocSearchContext);

  const { handleLocationClicked } = useContext(SurfDataContext);

  return (
    <div className={styles.SearchResultsContainer}>
      {invalidSearch ? (
        <p>Invalid location. Please check your search term and try again.</p>
      ) : (
        <>
        <p>Search Results</p>
        <ul>
          {locations.map(loc => (
            <li key={loc.annotations.geohash}>
              <NavLink to="/surfcheck" onClick={() => handleLocationClicked(loc)}>
                {loc.annotations.flag}   {loc.formatted}
              </NavLink>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  )
}
