import React from 'react';
import './ProductAnalysis.css';

const ProductAnalysis = () => {
    return (
        <div className="product-analysis">
            <img src="your-image-url-here" alt="Thermos Flask" />
            <div className="analysis-text">
                <h3>AliAdapt <span style={{ color: '#000' }}>Analysis</span></h3>
                <p><strong>Object:</strong> Thermos Flask</p>
                <p><strong>Category:</strong> Water Bottles</p>
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>Stainless steel</li>
                    <li>500ml Capacity</li>
                    <li>Comes in multiple colors</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductAnalysis;