import { useEffect } from "react";
import useLocalTime from "../services/hooks/useLocalTime";
import Chart from 'react-apexcharts';

import styles from '../styles/components/WindForecast.module.css';

const options = {
  chart: {
    toolbar: {
      show: false
    }
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12',
      fontFamily: 'Inter',
      fontWeight: '400'
    }
  },
  stroke: {
     show: false,
     curve: 'smooth',
     width: 2
  },
  fill: {
    type: "gradient",
    gradient: {
      type: 'vertical',
      gradientToColors: [ '#fd8235'],
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    type: 'category',
    categories: [
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm'
    ]
  },
  yaxis: {
    show: false,
    min: 1,
    max: 15,
        }
}

const series = [
  {
    name: 'series1',
    data: [7,9,10,10,9,8]
  }
];

export default function WindForecast({ location }) {
  const {
    startDateTideISOString,
    endDateISOString
  } = useLocalTime(location);

  const getWindData = async () => {
    const url = 'https://api.stormglass.io/v2/weather/point';
    const apiKey = '66d9612a-22c0-11eb-a5a9-0242ac130002-66d961a2-22c0-11eb-a5a9-0242ac130002';

    const lat = location.geometry.lat;
    const lng = location.geometry.lng;

    const params = [
      'windSpeed', 'windDirection', 'gust'
    ].join(',');

    const searchUrl = `${url}?lat=${lat}&lng=${lng}&params=${params}&source=noaa&start=${startDateTideISOString}&end=${endDateISOString}`;

    try {
      const response = await fetch(searchUrl, {
        headers: {
          'Authorization': apiKey
        }
      });
      const jsonData = await response.json();

      console.log(jsonData)
      // const tideDataArray = jsonData.data;
      // setTideData(tideDataArray);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getWindData();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.header}>
          Wind (kts)
        </h3>
      </div>
      <div>
        <Chart options={options} series={series} type="line" height={160} />
      </div>

    </div>

  );
}
