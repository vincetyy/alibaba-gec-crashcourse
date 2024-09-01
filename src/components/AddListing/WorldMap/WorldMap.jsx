import React from 'react';
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
    const filteredCountries = selectedCountries.filter(country =>
        ['Australia', 'Indonesia'].includes(country)
    );

    // Sort and create a key for the mapImages object
    const key = reviewSubmitted ? finalMap : filteredCountries.sort().join(',');

    return (
        <div className="world-map">
            <img src={mapImages[key] || fullMap} alt="World Map" />
        </div>
    );
};

export default WorldMap;