import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import fullMap from "../../../assets/maps/Full.png";
import australiaMap from "../../../assets/maps/Australia.png";
import indonesiaMap from "../../../assets/maps/Indonesia.png";
import australiaIndonesiaMap from "../../../assets/maps/Australia_Indonesia.png";
import finalMap from "../../../assets/maps/Final_Map.png"; // Assuming this is the map to be shown after review listing
import './WorldMap.css';

const mapImages = {
    '': fullMap,  // No country selected
    'Australia': australiaMap,
    'Indonesia': indonesiaMap,
    'Australia,Indonesia': australiaIndonesiaMap,
    'Final': finalMap, // Final state after review listing is clicked
};

const WorldMap = ({ selectedCountries, reviewSubmitted }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    // Exclude Singapore and only include Australia and Indonesia
    const filteredCountries = selectedCountries.filter(country =>
        ['Australia', 'Indonesia'].includes(country)
    );

    // Sort and create a key for the mapImages object
    const key = reviewSubmitted ? 'Final' : filteredCountries.sort().join(',');

    const handleMapClick = () => {
        if (selectedCountries.includes('Singapore')) {
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