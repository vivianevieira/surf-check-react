import { useEffect, useState } from "react";
import useLocalTime from "../services/hooks/useLocalTime";

export default function LocalDateHeader({ location }) {
  const [dateHeader, setDateHeader] = useState('');

  const { locationTime } = useLocalTime(location);

  function getDateHeader() {
    const localDateHeader = new Intl.DateTimeFormat('en-US',
    { dateStyle: 'full' }).format(locationTime);

    setDateHeader(localDateHeader);
  }

  useEffect(() => {
    getDateHeader();
  }, []);


  return (
    <div style={{fontSize: '0.75rem', fontWeight: 300, color: '#6e7273', marginBottom: '8px' }}>
      {dateHeader}
    </div>

  );
}
