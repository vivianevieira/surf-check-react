import { useEffect, useState } from 'react'

export default function UVData({ location }) {
  const [UVnow, setUVnow] = useState('');
  const [UVmax, setUVmax] = useState('');

  const getUVData = async () => {
    const url = 'https://api.openuv.io/api/v1/uv';
    const apiKey = 'bcd6b978d838b85f76d8f466cb321d39';

    const lat = location.geometry.lat;
    const long = location.geometry.lng;

    const now = new Date();
    const startTime = now.toISOString();

    try {
      const searchUrl = `${url}?lat=${lat}&lng=${long}&dt=${startTime}`;
      const response = await fetch(searchUrl, {
        headers: {
          'x-access-token': apiKey
        }
      });
      const jsonData = await response.json();

      console.log(Math.round(jsonData.result.uv));
      console.log(Math.round(jsonData.result.uv_max))
      setUVnow(Math.round(jsonData.result.uv));
      setUVmax(Math.round(jsonData.result.uv_max));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUVData();
  }, []);



  return (
    <div>
      <p>UV Index</p>
    </div>

  );
}
