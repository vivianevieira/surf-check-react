import React, { useContext, useEffect } from 'react';
import { LocSearchContext } from '../contexts/LocSearchContext';
import { SurfDataContext } from '../contexts/SurfDataContext';
import LocationSearch from '../components/LocationSearch';
import SearchResults from '../components/SearchResults';
import SuggestedSpotsList from '../components/SuggestedSpotsList';

export default function Home() {
  const appContext = useContext(LocSearchContext);
  const { searchLoading, setSearchLoading, setInvalidSearch } = appContext;

  const { setInvalidSpot } = useContext(SurfDataContext);

  useEffect(() => {
    setSearchLoading(false);
    setInvalidSpot(false);
    setInvalidSearch(false);
  }, []);

  return (
    <>
      <LocationSearch />
      {searchLoading === true ? (
        <SearchResults />
      ) : (
        <SuggestedSpotsList />
      )}
    </>
  )
};
