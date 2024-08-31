import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation(); // Initialize useLocation
    const [selected, setSelected] = useState('Dashboard'); // Default selected state

    // Update the selected state based on the current location path
    useEffect(() => {
        if (location.pathname === '/add-international-listing') {
            setSelected('Add International Listing');
        } else {
            setSelected('Dashboard');
        }
    }, [location.pathname]); // Re-run effect when location changes

    const handleSelection = (item, path) => {
        setSelected(item);
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className="sidebar">
            <ul>
                <li 
                    className={selected === 'Dashboard' ? 'selected' : ''} 
                    onClick={() => handleSelection('Dashboard', '/')}
                >
                    <span className="logo-text"><span className="brand">AliAdapt</span> Dashboard</span>
                </li>
                <li 
                    className={selected === 'Add International Listing' ? 'selected' : ''} 
                    onClick={() => handleSelection('Add International Listing', '/add-international-listing')}
                >
                    Add International Listing
                </li>
            </ul>
        </div>
    );
};

export default SideBar;