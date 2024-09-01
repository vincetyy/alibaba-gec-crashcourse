import React from 'react';
import './SelectedCountries.css';

const SelectedCountries = ({ selectedCountries, reviewSubmitted, singaporeColor }) => {
    return (
        <div className="selected-countries">
            <h4>Selected Countries</h4>
            <ul>
                {selectedCountries.map((country, index) => (
                    <li
                        key={index}
                        className={country === 'Singapore' ? singaporeColor : (reviewSubmitted ? 'green-text' : '')}
                    >
                        {country}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedCountries;