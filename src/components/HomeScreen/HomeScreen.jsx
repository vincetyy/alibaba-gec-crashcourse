import React from 'react';
import TitleBar from '../TitleBar/TitleBar';
import Sidebar from '../Sidebar/Sidebar';
import SearchTable from '../SearchTable/SearchTable';
import StatCards from '../StatCards/StatCards';
import Charts from '../Charts/Charts';
import AIAssistant from '../AIAssistant/AIAssistant';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area">
                    <div className="left-section">
                        <SearchTable />
                    </div>
                    <div className="right-section">
                        <StatCards />
                        <Charts />
                        <AIAssistant />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;