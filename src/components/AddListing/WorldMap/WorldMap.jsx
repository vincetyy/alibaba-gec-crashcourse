import React from 'react';
import { useNavigate } from 'react-router-dom';
import fullMap from "../../../assets/maps/Full.png";
import australiaMap from "../../../assets/maps/Australia.png";
import indonesiaMap from "../../../assets/maps/Indonesia.png";
import australiaIndonesiaMap from "../../../assets/maps/Australia_Indonesia.png";
import finalMapPass from "../../../assets/maps/Final_Map_Pass.png";
import finalMapFail from "../../../assets/maps/Final_Map_Fail.png";
import './WorldMap.css';

const mapImages = {
    '': fullMap,  // No country selected
    'Australia': australiaMap,
    'Indonesia': indonesiaMap,
    'Australia,Indonesia': australiaIndonesiaMap,
    'Final_Map_Pass.png': finalMapPass,
    'Final_Map_Fail.png': finalMapFail,
};

const WorldMap = ({ selectedCountries, reviewSubmitted, finalMap }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const filteredCountries = selectedCountries.filter(country =>
        ['Australia', 'Indonesia'].includes(country)
    );

    // Sort and create a key for the mapImages object
    const key = reviewSubmitted ? finalMap : filteredCountries.sort().join(',');

    const handleMapClick = () => {
        if (reviewSubmitted) {
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