import React from 'react';
import './TitleBar.css';
import logo from '../../../assets/logos/AliExpress_Seller_Center_Logo.png'; // Import your logo

const TitleBar = () => {
    return (
        <div className="title-bar">
            <div className="left-section-title">
                <img src={logo} alt="AliExpress Seller Center" className="logo" />
                <span className="separator-title"></span>
                <span className="title-text">International Regulation Compliance Centre</span>
            </div>
            <div className="right-section-title">
                <span className="language">English/SG</span>
                <span className="separator-title"></span>
                <span className="notifications-icon">&#128276;</span> {/* You can replace this with an actual icon */}
                <span className="user-icon">&#128100;</span> {/* You can replace this with an actual icon */}
            </div>
        </div>
    );
};

export default TitleBar;