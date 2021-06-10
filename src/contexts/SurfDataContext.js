import React, { useState, createContext} from 'react';

export const SurfDataContext = React.createContext();

export function SurfDataProvider(props) {
  const url = 'https://api.stormglass.io/v2/weather/point';
  const apiKey = '66d9612a-22c0-11eb-a5a9-0242ac130002-66d961a2-22c0-11eb-a5a9-0242ac130002';
  const params = [
    'swellHeight', 'swellDirection', 'swellPeriod,waveHeight', 'waveDirection',
    'wavePeriod', 'secondarySwellHeight', 'secondarySwellDirection', 'secondarySwellPeriod',
    'windWaveHeight', 'windWaveDirection', 'windWavePeriod', 'airTemperature',
    'waterTemperature', 'windSpeed', 'windDirection', 'gust'
  ].join(',');

  const [location, setLocation] = useState({});
  const [surfData, setSurfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invalidSpot, setInvalidSpot] = useState(false);

  const handleLocationClicked = async (props) => {
    setLoading(true);
    setLocation(props);
    const { formatted, geometry } = props;

    const lat = geometry.lat;
    const long = geometry.lng;

    const startTime = Math.floor(Date.now() / 1000);
    const searchUrl = `${url}?lat=${lat}&lng=${long}&params=${params}&source=noaa&start=${startTime}`;

    try {
      const response =  await fetch(searchUrl, {
        headers: {
          'Authorization': apiKey
        }
      })

      const data = await response.json();

      const surfDataNow = data.hours[0];

      if (surfDataNow.waveHeight === undefined) {
        setInvalidSpot(true);
      } else {
        setSurfData(surfDataNow);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }

  }

  return(
    <SurfDataContext.Provider value={{
      location,
      loading,
      surfData,
      handleLocationClicked,
      invalidSpot,
      setInvalidSpot
    }}>
      { props.children }
    </SurfDataContext.Provider>
  )
}
