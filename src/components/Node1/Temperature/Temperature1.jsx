import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import './Temperature1.css';
import temperature from '../../../assets/temperature.png';

const Temperature1 = ({ nodeId, farm }) => {
  // const [data, setData] = useState({ timestamps: [], temperatures: [] });
  // const [latestTemperature, setLatestTemperature] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let temperatureResponse;
  //       try {
  //           temperatureResponse = await fetch(`http://localhost:5000/api/${farm}/${nodeId}/temperatures`);
  //       } catch (error) {
  //           console.error('Failed to fetch from localhost:5000, trying localhost:6000', error);
  //           temperatureResponse = await fetch(`http://localhost:4000/${farm}/${nodeId}/temperature`);
  //       }
  //       const temperatures = await temperatureResponse.json();
      

  //       const firstFiveTemperatures = temperatures.slice(-24).map(temp => Math.round(temp));

  //       // Set the latest temperature
  //       setLatestTemperature(firstFiveTemperatures[firstFiveTemperatures.length - 1]);

  //       let timestampResponse;
  //       try {
  //         timestampResponse = await fetch(`http://localhost:5000/api/${farm}/${nodeId}/timestamps`);
  //       } catch (error) {
  //         console.error('Failed to fetch from localhost:5000, trying localhost:6000', error);
  //         timestampResponse = await fetch(`http://localhost:4000/${farm}/${nodeId}/timestamp`);
  //       } 
  //       const timestamps = await timestampResponse.json();
  //       const formattedTimestamps = timestamps.map(timestamp => {
  //         const date = new Date(timestamp);
  //         const hours = date.getHours();
  //         const minutes = date.getMinutes();
  //         return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  //       }).slice(-24);

  //       setData({ timestamps: formattedTimestamps, temperatures: firstFiveTemperatures });
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [nodeId]);

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
        text: 'Temperature(F)',
        style: {
          fontSize: '11px',
        },
      },
    },
    title: {
      text: `Temperature Node ${nodeId}`,
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
      data: data.temperatures
    }
  ];

  return (
    <div className="temperature1">
      <div className="table1_tem">
        <img src={temperature} alt="" />
        <h1>Temperature</h1>
        <p>{latestTemperature ? `${latestTemperature}F` : 'Loading...'}</p>
      </div>
      <Chart className="temp_graph_1" height={450} width={600} options={options} series={series} type="area" />
    </div>
  );
}

export default Temperature1;