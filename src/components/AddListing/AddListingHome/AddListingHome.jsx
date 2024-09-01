import React, { useState } from 'react';
import TitleBar from '../../Bars/TitleBar/TitleBar';
import SideBar from '../../Bars/SideBar/SideBar';
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
        setSelectedCountries([]); // Reset selected countries when analysis changes
        setReviewSubmitted(false); // Reset review state when analysis changes
    };

    const handleReview = () => {
        setReviewSubmitted(true);
    };

    const getSingaporeColor = () => {
        if (!reviewSubmitted) return ''; // No color before review is submitted
        return analysis.exportable ? 'green-text' : 'red-text';
    };

    const getFinalMap = () => {
        if (!reviewSubmitted) return ''; // No map change before review is submitted
        return analysis.exportable ? 'Final_Map_Pass.png' : 'Final_Map_Fail.png';
    };

    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <SideBar />
                <div className="content-area-vertical">
                    <div className="top-section">
                        <ProductDetails onAnalysisUpdate={handleAnalysisUpdate} />
                        <ProductAnalysis analysis={analysis} />
                    </div>
                    <div className="bottom-section">
                        <CountryFilter 
                            onSelectedCountriesChange={setSelectedCountries} 
                            onReview={handleReview}
                            selectedCountriesProp={selectedCountries}
                        />
                        <SelectedCountries 
                            selectedCountries={selectedCountries} 
                            reviewSubmitted={reviewSubmitted} 
                            singaporeColor={getSingaporeColor()}
                        />
                        <WorldMap 
                            selectedCountries={selectedCountries} 
                            reviewSubmitted={reviewSubmitted}
                            finalMap={getFinalMap()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListingHome;