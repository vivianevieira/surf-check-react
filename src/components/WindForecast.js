import { useEffect, useState } from "react";
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
    enabledOnSeries: [0],
    style: {
      fontSize: '12',
      fontFamily: 'Inter',
      fontWeight: '400'
    }
  },
  stroke: {
     show: true,
     curve: 'smooth',
     width: 2
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
    ],
    labels: {
      style: {
        fontSize: '9'
      }
    }
  },
  yaxis: {
    show: false,
    min: 1,
    max: 20,
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: [{
      formatter: function (y) {
        if(typeof y !== "undefined") {
          return  y.toFixed(0) + "kts";
        }
        return y;
      }
    }, {
      formatter: function (y) {
        if(typeof y !== "undefined") {
          return  y.toFixed(0) + "°";
        }
        return y;
      }
    }, {
      formatter: function (y) {
        if(typeof y !== "undefined") {
          return  y.toFixed(0) + "kts gusts";
        }
        return y;
      }
    }],
    marker: {
      show: false
    }
  },
  legend: {
    show: false
  }
}

export default function WindForecast({ location }) {
  const [series, setSeries] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const {
    startDateTideISOString,
    endDateISOString
  } = useLocalTime(location);

  const getWindData = async () => {
    const url = 'https://api.stormglass.io/v2/weather/point';
    const apiKey = process.env.REACT_APP_STORMGLASS_API;

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

      const windSpeedArray = [];
      const windDirectionArray = [];
      const windGustArray = [];

      jsonData.hours
        .filter((el, i) => i == 6 || i == 9 || i == 12 || i == 15 || i == 18 || i == 20)
        .forEach((el) => {
          windSpeedArray.push(Math.round(el.windSpeed.noaa * 1.944));
          windDirectionArray.push(el.windDirection.noaa);
          windGustArray.push(Math.round(el.gust.noaa * 1.944));
        })

      const newChartSeries = [
        {
          name: 'speed',
          type: 'line',
          data: windSpeedArray
        },
        {
          name: 'direction',
          data: windDirectionArray
        },
        {
          name: 'gusts',
          data: windGustArray
        }
      ];

      setSeries(newChartSeries);

      setShowInfo(!showInfo);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getWindData();
  }, []);

  return (
    <>
      {showInfo ?
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
      : null}
    </>
  );
}
