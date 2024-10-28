import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import './Humidity1.css';
import humidity from '../../../assets/humidity.png';

const Humidity1 = ({ nodeId, farm }) => {
  const [data, setData] = useState({ timestamps: [], humidities: [] });
  const [latestHumidity, setLatestHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let humidityResponse;
        try {
            humidityResponse = await fetch(`http://localhost:5000/api/${farm}/${nodeId}/humidities`);
           
        } catch (error) {
            console.error('Failed to fetch from localhost:5000, trying localhost:4000', error);
            humidityResponse = await fetch(`http://localhost:4000/${farm}/${nodeId}/humidity`);
        }
        const humidities = await humidityResponse.json();
        const firstFiveHumidities = humidities.slice(-24).map(hum => Math.round(hum));

        // Set the latest humidity
        setLatestHumidity(firstFiveHumidities[firstFiveHumidities.length - 1]);

        let timestampResponse;
        try {
          timestampResponse = await fetch(`http://localhost:5000/api/${farm}/${nodeId}/timestamps`);
        } catch (error) {
          console.error('Failed to fetch from localhost:5000, trying localhost:4000', error);
          timestampResponse = await fetch(`http://localhost:4000/${farm}/${nodeId}/timestamp`);
        } 
        const timestamps = await timestampResponse.json();
        const formattedTimestamps = timestamps.map(timestamp => {
          const date = new Date(timestamp);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        }).slice(-24);

        setData({ timestamps: formattedTimestamps, humidities: firstFiveHumidities });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [nodeId]);

  const options = {
    xaxis: {
      categories: data.timestamps,
      title: {
        text: 'Time',
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      title: {
        text: 'Humidity(%)',
        style: {
          fontSize: '11px',
        },
      },
    },
    title: {
      text: `Humidity Node ${nodeId}`,
      align: 'left',
      style: {
        fontSize: '15px',
        color: '#263238'
      }
    },
  };

  const series = [
    {
      name: "series-1",
      data: data.humidities
    }
  ];

  return (
    <div className="humidity1">
      <div className="table1_humidity">
        <img src={humidity} alt="" />
        <h1>Humidity</h1>
        <p>{latestHumidity ? `${latestHumidity}%` : 'Loading...'}</p>
      </div>
      <Chart className="humidity_graph_1" height={450} width={600} options={options} series={series} type="area" />
    </div>
  );
}

export default Humidity1;