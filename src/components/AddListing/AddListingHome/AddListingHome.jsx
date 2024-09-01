import React, { useState } from 'react';
import TitleBar from '../../Bars/TitleBar/TitleBar';
import Sidebar from '../../Bars/SideBar/Sidebar';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductAnalysis from '../ProductAnalysis/ProductAnalysis';
import CountryFilter from '../CountryFilter/CountryFilter';
import SelectedCountries from '../SelectedCountries/SelectedCountries';
import WorldMap from '../WorldMap/WorldMap';
import './AddListingHome.css'; // Optional: style your component

const AddListingHome = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const [analysis, setAnalysis] = useState({});

    const handleAnalysisUpdate = (newAnalysis) => {
        setAnalysis(newAnalysis);
    };

    const handleReview = () => {
        setReviewSubmitted(true);
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
                        <CountryFilter 
                            onSelectedCountriesChange={setSelectedCountries} 
                            onReview={handleReview} 
                        />
                        <SelectedCountries 
                            selectedCountries={selectedCountries} 
                            reviewSubmitted={reviewSubmitted} 
                        />
                        <WorldMap 
                            selectedCountries={selectedCountries} 
                            reviewSubmitted={reviewSubmitted}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListingHome;