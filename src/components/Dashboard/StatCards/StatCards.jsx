import React from 'react';
import './StatCards.css';

const StatCards = () => {
    const stats = [
        { label: 'Regions Covered', value: 10 },
        { label: 'Verified Listings', value: 690 },
        { label: 'Compliancy Rating', value: '8.1 / 10', isCompliancy: true }, // Add isCompliancy flag
        { label: 'International Sales', value: 11045 },
    ];

    return (
        <div className="stat-cards">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <div className="stat-value">
                        {stat.isCompliancy ? (
                            <>
                                <span className="green-text">{stat.value.split(' ')[0]}</span>{' '}
                                / 10
                            </>
                        ) : (
                            stat.value
                        )}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;