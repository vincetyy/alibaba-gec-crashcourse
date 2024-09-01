import React, { useState, useEffect } from 'react';
import './CountryFilter.css';
import usaFlag from '../../../assets/flags/usa_flag.png';
import australiaFlag from '../../../assets/flags/australia_flag.png';
import singaporeFlag from '../../../assets/flags/singapore_flag.png';
import malaysiaFlag from '../../../assets/flags/malaysia_flag.png';
import vietnamFlag from '../../../assets/flags/vietnam_flag.png';
import indonesiaFlag from '../../../assets/flags/indonesia_flag.png';

const flagMap = {
    "USA": usaFlag,
    "Australia": australiaFlag,
    "Singapore": singaporeFlag,
    "Malaysia": malaysiaFlag,
    "Vietnam": vietnamFlag,
    "Indonesia": indonesiaFlag
};

const CountryFilter = ({ onSelectedCountriesChange, onReview }) => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the countries data from the JSON file
        fetch('/assets/data/country_data.json')
            .then(response => response.json())
            .then(data => {
                const sortedCountries = data.countries.sort((a, b) => a.name.localeCompare(b.name));
                setCountries(sortedCountries);
                setFilteredCountries(sortedCountries); // Initially, display all countries
            })
            .catch(error => console.error('Error loading countries:', error));
    }, []);

    useEffect(() => {
        // Filter countries based on the search term
        const filtered = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [searchTerm, countries]);

    const handleCheckboxChange = (countryName) => {
        setSelectedCountries(prevSelected => {
            const isSelected = prevSelected.includes(countryName);
            const updatedSelected = isSelected 
                ? prevSelected.filter(name => name !== countryName) 
                : [...prevSelected, countryName];
            
            onSelectedCountriesChange(updatedSelected);
            return updatedSelected;
        });
    };

    const handleReviewClick = () => {
        onReview();
    };

    return (
        <div className="country-filter">
            <input 
                type="text" 
                placeholder="Search for..." 
                className="search-input" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} // Update search term on input change
            />
            <div className="table-wrapper">
                <table className="country-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Country Name</th>
                            <th>Region</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCountries.map((country, index) => (
                            <tr key={index}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCountries.includes(country.name)}
                                        onChange={() => handleCheckboxChange(country.name)} 
                                    />
                                </td>
                                <td>{country.name}</td>
                                <td>{country.region}</td>
                                <td className="flag-cell-listing">
                                    <img src={flagMap[country.name]} alt={country.name} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="review-button" onClick={handleReviewClick}>Review Listing</button>
        </div>
    );
};

export default CountryFilter;