import React, { useState, useEffect } from 'react';
import './SearchTable.css';
import usaFlag from '../../../assets/flags/usa_flag.png';
import vietnamFlag from '../../../assets/flags/vietnam_flag.png';
import indonesiaFlag from '../../../assets/flags/indonesia_flag.png';
import koreaFlag from '../../../assets/flags/korea_flag.png';
import philippinesFlag from '../../../assets/flags/philippines_flag.png';
import malaysiaFlag from '../../../assets/flags/malaysia_flag.png';

const flagMap = {
    "usa": usaFlag,
    "vietnam": vietnamFlag,
    "indonesia": indonesiaFlag,
    "korea": koreaFlag,
    "philippines": philippinesFlag,
    "malaysia": malaysiaFlag,
    // Map other flags here...
};

const SearchTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [checkedItems, setCheckedItems] = useState({}); // Track the checked state of each row
    const [isAllChecked, setIsAllChecked] = useState(false); // Track the state of the "select all" checkbox


    useEffect(() => {
        // Fetch the data from the JSON file
        fetch('src/assets/data/product_data.json')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                const initialCheckedState = {};
                data.products.forEach(product => {
                    initialCheckedState[product.id] = false;
                });
                setCheckedItems(initialCheckedState);
            })
            .catch(error => console.error('Error loading data:', error));
    }, []);


    // Filter the products based on the search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle the "select all" checkbox change
    const handleSelectAllChange = (e) => {
        const newCheckedState = {};
        filteredProducts.forEach(product => {
            newCheckedState[product.id] = e.target.checked;
        });
        setCheckedItems(newCheckedState);
        setIsAllChecked(e.target.checked);
    };

    // Handle individual row checkbox change
    const handleCheckboxChange = (e, productId) => {
        setCheckedItems({
            ...checkedItems,
            [productId]: e.target.checked
        });

        // Update "select all" checkbox state
        if (!e.target.checked) {
            setIsAllChecked(false);
        } else {
            const allChecked = filteredProducts.every(
                product => checkedItems[product.id] || product.id === productId
            );
            setIsAllChecked(allChecked);
        }
    };

    return (
        <div className="search-table">
            <input type="text" placeholder="Search for..." className="search-input" onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th><input
                                    type="checkbox"
                                    checked={isAllChecked}
                                    onChange={handleSelectAllChange}
                                /></th><th>Product Name</th><th>Date</th><th>Country</th><th>Status</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td><input
                                        type="checkbox"
                                        checked={checkedItems[product.id] || false}
                                        onChange={(e) => handleCheckboxChange(e, product.id)}
                                    /></td>
                                <td>{product.productName}</td>
                                <td>{product.date}</td>
                                <td className="flag-cell">
                                    <img
                                        src={flagMap[product.country]}
                                        alt="flag"
                                    />
                                </td>
                                <td><span className={`status ${product.status.toLowerCase()}`}>{product.status}</span></td>
                                <td className="options">
                                    <div className="more-options">
                                        <span>•••</span>
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