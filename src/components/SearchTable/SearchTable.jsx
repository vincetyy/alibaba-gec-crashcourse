import React, { useState, useEffect } from 'react';
import './SearchTable.css';

const SearchTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the data from the JSON file
        fetch('src/assets/data/product_data.json')
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    return (
        <div className="search-table">
            <input type="text" placeholder="Search for..." className="search-input" />
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Country</th>
                            <th>Status</th>
                            <th></th> {/* Empty header for the options column */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{product.productName}</td>
                                <td>{product.date}</td>
                                <td><img src={`/assets/images/flags/${product.country}`} alt="flag" /></td>
                                <td><span className={`status ${product.status.toLowerCase()}`}>{product.status}</span></td>
                                <td className="options">
                                    <div className="more-options">
                                        <span>•••</span> {/* The three dots icon */}
                                        {/* Add dropdown or actions here */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchTable;