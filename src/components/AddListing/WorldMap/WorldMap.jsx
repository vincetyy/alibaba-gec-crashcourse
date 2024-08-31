import React from 'react';
import world_map from "../../../assets/world_map.png"
import './WorldMap.css';

const WorldMap = () => {
    return (
        <div className="world-map">
            <img src={ world_map } alt="World Map" />
        </div>
    );
};

export default WorldMap;