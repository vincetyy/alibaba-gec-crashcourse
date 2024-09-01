import React, { useState } from 'react';
import TitleBar from '../../Bars/TitleBar/TitleBar';
import Sidebar from '../../Bars/SideBar/Sidebar';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductAnalysis from '../ProductAnalysis/ProductAnalysis';
import CountryFilter from '../CountryFilter/CountryFilter';
import SelectedCountries from '../SelectedCountries/SelectedCountries';
import WorldMap from '../WorldMap/WorldMap';
import './AddListingHome.css';

const AddListingHome = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [analysis, setAnalysis] = useState({});

    const handleAnalysisUpdate = (newAnalysis) => {
        setAnalysis(newAnalysis);
    };

    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area-vertical">
                    <div className="top-section">
                        <ProductDetails onAnalysisUpdate={handleAnalysisUpdate} />
                        <ProductAnalysis analysis={analysis} />
                    </div>
                    <div className="bottom-section">
                        <CountryFilter onSelectedCountriesChange={setSelectedCountries} />
                        <SelectedCountries selectedCountries={selectedCountries} />
                        <WorldMap selectedCountries={selectedCountries} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListingHome;