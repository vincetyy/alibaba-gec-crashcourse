import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './components/Dashboard/DashboardHome/DashboardHome';
import AddListingHome from './components/AddListing/AddListingHome/AddListingHome'; // Create this component for your other page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/add-international-listing" element={<AddListingHome />} />
            </Routes>
        </Router>
    );
};

export default App;