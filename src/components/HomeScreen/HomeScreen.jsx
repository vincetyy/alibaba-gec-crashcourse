import React from 'react';
import TitleBar from '../TitleBar/TitleBar';
import Sidebar from '../Sidebar/Sidebar';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <Sidebar />
                
            </div>
        </div>
    );
};

export default HomeScreen;