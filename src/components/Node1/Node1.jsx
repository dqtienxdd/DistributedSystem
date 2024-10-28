import React from 'react';
import Temperature1 from './Temperature/Temperature1.jsx';
import Humidity1 from './Humidity/Humidity1.jsx';
import Lux from './Lux/Lux1.jsx';
import { useNavigate, useParams } from "react-router-dom";
import './Node1.css';

const Node1 = () => {
    const navigate = useNavigate();
    const { farm,nodeId } = useParams(); // Retrieve the nodeId from the URL

    return (
        <div className="custom1">
            <a href="#" className="home" onClick={() => { navigate('/') }}>
                <span>Home</span>
            </a>
            <Lux nodeId={nodeId} farm ={farm} />
            <Temperature1 nodeId={nodeId} farm ={farm} />
            <Humidity1 nodeId={nodeId}  farm ={farm}/>
            <a href="#" className="water" onClick={() => { window.alert('Watering'); }}>
                <span>water</span>
            </a>
            <a href="#" className="light" onClick={() => { window.alert('Light is turning on'); }}>
                <span>light</span>
            </a>
        </div>
    );
}

export default Node1;