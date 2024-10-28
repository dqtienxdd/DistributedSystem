import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import './Lux1.css';
import soilmoisture from '../../../assets/lux.png';

const Lux1 = ({ nodeId, farm }) => {
  const [data, setData] = useState({ timestamps: [], soilmoistures: [] });
  const [latestSoilMoisture, setLatestSoilMoisture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let soilmoistureResponse;
        try {
          soilmoistureResponse = await fetch(`http://localhost:5000/api/${farm}/${nodeId}/soilmoistures`);
        } catch (error) {
          console.error('Failed to fetch from localhost:5000, trying localhost:6000', error);
          soilmoistureResponse = await fetch(`http://localhost:4000/${farm}/${nodeId}/soilmoisture`);
        }
        const soilmoistures = await soilmoistureResponse.json();
        const firstFiveSoilMoistures = soilmoistures.slice(0, 24).map(sm => Math.round(sm));
  
        // Set the latest soil moisture
        setLatestSoilMoisture(firstFiveSoilMoistures[firstFiveSoilMoistures.length - 1]);
  
        let timestampResponse;
        try {
          timestampResponse = await fetch(`http://localhost:5000/api/${farm}/${nodeId}/timestamps`);
        } catch (error) {
          console.error('Failed to fetch from localhost:5000, trying localhost:6000', error);
          timestampResponse = await fetch(`http://localhost:4000/${farm}/${nodeId}/timestamp`);
        }
        const timestamps = await timestampResponse.json();
        const formattedTimestamps = timestamps.map(timestamp => {
          const date = new Date(timestamp);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        }).slice(0, 24);
  
        setData({ timestamps: formattedTimestamps, soilmoistures: firstFiveSoilMoistures });
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
        text: 'Soil Moisture(%)',
        style: {
          fontSize: '11px',
        },
      },
    },
    title: {
      text: `Soil Moisture Node ${nodeId}`,
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
      data: data.soilmoistures
    }
  ];

  return (
    <div className="lux1">
      <div className="table1_lux">
        <img src={soilmoisture} alt="" />
        <h1>Soil Moisture</h1>
        <p>{latestSoilMoisture ? `${latestSoilMoisture}mPs` : 'Loading...'}</p>
      </div>
    
    </div>
  );
}

export default Lux1;