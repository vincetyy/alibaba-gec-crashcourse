import React from 'react';
import './SearchTable.css';

const SearchTable = () => {
    return (
        <div className="search-table">
            <input type="text" placeholder="Search for..." className="search-input" />
            <table className="data-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Product Name</th>
                        <th>Date</th>
                        <th>Country</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example rows, replace with dynamic data */}
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>Product 1</td>
                        <td>16/08/24</td>
                        <td><img src="flag_url" alt="flag" /></td>
                        <td><span className="status processing">Processing</span></td>
                    </tr>
                    {/* Repeat similar rows as needed */}
                </tbody>
            </table>
            <div className="pagination">
                <span>Previous</span>
                {/* Add page numbers */}
                <span>Next</span>
            </div>
        </div>
    );
};

export default SearchTable;