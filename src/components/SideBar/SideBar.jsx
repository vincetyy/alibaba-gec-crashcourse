import React, { useState } from 'react';
import './SideBar.css';

const SideBar = () => {
    const [selected, setSelected] = useState('Dashboard');

    const handleSelection = (item) => {
        setSelected(item);
    };

    return (
        <div className="sidebar">
            <ul>
                <li 
                    className={selected === 'Dashboard' ? 'selected' : ''} 
                    onClick={() => handleSelection('Dashboard')}
                >
                    <span className="logo-text"><span className="brand">AliAdapt</span> Dashboard</span>
                </li>
                <li 
                    className={selected === 'Add International Listing' ? 'selected' : ''} 
                    onClick={() => handleSelection('Add International Listing')}
                >
                    Add International Listing
                </li>
                <li 
                    className={selected === 'Help Centre' ? 'selected' : ''} 
                    onClick={() => handleSelection('Help Centre')}
                >
                    Help Centre
                </li>
            </ul>
        </div>
    );
};

export default SideBar;