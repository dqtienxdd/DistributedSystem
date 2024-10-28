import React, { useEffect, useState } from 'react';
import './Mainpage.css'
import {useNavigate} from "react-router-dom";
import { Button } from "./button/button.jsx";
import axios from "axios";

const Mainpage = () => {
    const [nodeIds, setNodeIds] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNode = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:5000/api/nodeid');
                if (res.data || Array.isArray(res.data)) {
                    setNodeIds(res.data);
                }
                setLoading(false);
            } catch (e) {
                if (e.response && e.response.status === 404) {
                    setError('The requested resource was not found.');
                } else {
                    setError(e.message);
                    console.error(e.message);
                }
                setLoading(false);
            }
        }
        fetchNode();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="Farm1">
        {nodeIds.map((node, index) => (
            <div className="button_node" key={index}>
                <Button
                    onClick={() => navigate(`/${node.farm}/${node.nodeid}`)}
                    type="button"
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--large"
                >
                    {node.farm} - {node.nodeid}
                </Button>
            </div>
        ))}
    </div>
    )
}
export default Mainpage