import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import fullMap from "../../../assets/maps/Full.png";
import australiaMap from "../../../assets/maps/Australia.png";
import indonesiaMap from "../../../assets/maps/Indonesia.png";
import singaporeMap from "../../../assets/maps/Singapore.png";
import australiaIndonesiaMap from "../../../assets/maps/Australia_Indonesia.png";
import australiaSingaporeMap from "../../../assets/maps/Australia_Singapore.png";
import indonesiaSingaporeMap from "../../../assets/maps/Indonesia_Singapore.png";
import australiaIndonesiaSingaporeMap from "../../../assets/maps/Australia_Indonesia_Singapore.png";
import './WorldMap.css';

const mapImages = {
    '': fullMap,  // No country selected
    'Australia': australiaMap,
    'Indonesia': indonesiaMap,
    'Singapore': singaporeMap,
    'Australia,Indonesia': australiaIndonesiaMap,
    'Australia,Singapore': australiaSingaporeMap,
    'Indonesia,Singapore': indonesiaSingaporeMap,
    'Australia,Indonesia,Singapore': australiaIndonesiaSingaporeMap,
};

const WorldMap = ({ selectedCountries }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const filteredCountries = selectedCountries.filter(country =>
        ['Australia', 'Indonesia', 'Singapore'].includes(country)
    );

    // Sort and create a key for the mapImages object
    const key = filteredCountries.sort().join(',');

    const handleMapClick = () => {
        if (filteredCountries.includes('Singapore')) {
            navigate('/'); // Navigate to the dashboard
        }
    };

    return (
        <div className="world-map" onClick={handleMapClick}>
            <img src={mapImages[key] || fullMap} alt="World Map" />
        </div>
    );
};

export default WorldMap;