import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import AddInternationalListing from './components/AddInternationalListing/AddInternationalListing'; // Create this component for your other page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-international-listing" element={<AddInternationalListing />} />
            </Routes>
        </Router>
    );
};

export default App;