import React from 'react';
import './CountryFilter.css';

const CountryFilter = () => {
    return (
        <div className="country-filter">
            <input type="text" placeholder="Search for..." className="search-input" />
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
                    {/* Example rows, replace with dynamic data */}
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>Malaysia</td>
                        <td>Southeast Asia</td>
                        <td><img src="/assets/flags/malaysia_flag.png" alt="Malaysia" /></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>Indonesia</td>
                        <td>Southeast Asia</td>
                        <td><img src="/assets/flags/indonesia_flag.png" alt="Indonesia" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CountryFilter;