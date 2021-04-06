import React, { useState } from 'react';

export const LocSearchContext = React.createContext();

export function LocSearchProvider(props) {
  let url = 'https://api.opencagedata.com/geocode/v1/json';
  const apiKey = '2338c18f4b274400b9a2969d91cba7c7';

  const [locations, setLocations] = useState([])
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [invalidSearch, setInvalidSearch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    try {
      const searchUrl = `${url}?q=${search}&key=${apiKey}&language=en&pretty=1`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      if (data.results.length === 0) {
        setInvalidSearch(true);
      } else {
        setLocations(data.results);
        setInvalidSearch(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <LocSearchContext.Provider value={{
      search,
      locations,
      searchLoading,
      setSearchLoading,
      handleSubmit,
      handleSearchChange,
      invalidSearch,
      setInvalidSearch
    }}>
      { props.children }
    </LocSearchContext.Provider>
  );
}
