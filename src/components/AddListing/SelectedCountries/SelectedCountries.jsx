import React from 'react';
import './SelectedCountries.css';

const SelectedCountries = () => {
    return (
        <div className="selected-countries">
            <h4>Selected Countries</h4>
            <ul>
                <li>Australia</li>
                <li>Malaysia</li>
                <li>Philippines</li>
                <li>Indonesia</li>
            </ul>
        </div>
    );
};

export default SelectedCountries;