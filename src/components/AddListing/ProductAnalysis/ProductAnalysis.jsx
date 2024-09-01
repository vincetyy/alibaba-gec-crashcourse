import React from 'react';
import './ProductAnalysis.css';
import pmd from '../../../assets/pmd.jpg';

const ProductAnalysis = ({ analysis }) => {
    return (
        <div className="product-analysis">
            {analysis.item_type ? (
                <>
                    <img src={pmd} alt="Product" />
                    <div className="analysis-text">
                        <h3>AliAdapt <span style={{ color: '#000' }}>Analysis</span></h3>
                        <p><strong>Object:</strong> {analysis.item_type}</p>
                        <p><strong>Exportable:</strong> {analysis.exportable ? 'Yes' : 'No'}</p>
                        <p><strong>Key Features:</strong></p>
                        <ul>
                            <li>Stainless steel</li>
                            <li>500ml Capacity</li>
                            <li>Comes in multiple colors</li>
                        </ul>
                    </div>
                </>
            ) : (
                <div className="upload-prompt">
                    <p>Upload your product to use AliAdapt Analysis!</p>
                </div>
            )}
        </div>
    );
};

export default ProductAnalysis;