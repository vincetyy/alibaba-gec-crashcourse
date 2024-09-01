import React from 'react';
import './SelectedCountries.css';

const SelectedCountries = ({ selectedCountries, reviewSubmitted }) => {
    return (
        <div className="selected-countries">
            <h4>Selected Countries</h4>
            <ul>
                {selectedCountries.map((country, index) => (
                    <li
                        key={index}
                        className={reviewSubmitted ? (country === 'Singapore' ? 'red-text' : 'green-text') : ''}
                    >
                        {country}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedCountries;